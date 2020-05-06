import { launch } from 'puppeteer';
import { createLink, getAtIndex, getFirstIndex, loadFromFile, saveInFile } from './data';
import { getLinkedWords } from './scrapper';
const prettyBytes = require('pretty-bytes');

const maxWords = 5000;
const cacheWords = './data/cache.txt';

(async () => {
  loadFromFile(cacheWords)
  let index = getFirstIndex();
  console.log(`Start at index ${index}: ${getAtIndex(index).word.name}`)
  const browser = await launch();
  const page = await browser.newPage();
  while (index < maxWords) {
    const current = getAtIndex(index);
    current.networkWord.isVisited = true;

    console.log(`${index}/${maxWords}: ${current.id} - ${prettyBytes(process.memoryUsage().rss)}`)

    const linked = await getLinkedWords(page, current.id);
    if (linked.length) {
      const words = linked.map(l => l.words).reduce((acc, e) => ({...acc, ...e}) || {});
      for (const id of Object.keys(words)) {
        createLink(current.word, {id, name: words[id]});
      }
    }

    index++;
    if (index % 10 === 0) saveInFile(cacheWords);
  }
  saveInFile(cacheWords);
  await browser.close();
})();