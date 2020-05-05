import { Current, NetworkWord, Word } from './types';
import { readFileSync, writeFileSync } from "fs";

export const wordsId: string[] = [];
export const network: Map<string, NetworkWord> = new Map(); // <wordId, NetworkWord>

const defaultWord = 'train';

export function getAtIndex(index: number): Current {
  const id = wordsId[index];
  const networkWord = network.get(id);
  return {
    id,
    networkWord,
    word: {id, name: networkWord.name}
  }
}

// words file: structure isVisited, wordId, wordName, matchingWord1, matchingWord2, matchingWord3, ...\n
export function loadFromFile(path: string) {
  try {
    const raw = readFileSync(path, 'utf8');
    raw.split(`\n`).forEach(line => {
      const [isVisited, id, name, ...words] = line.split(',').map(w => w.trim());
      if (!network.get(id)) {
        network.set(id, {isVisited: isVisited == '1', name, words: new Set(words)});
        wordsId.push(id);
      }
    });
  } catch (e) {
    console.log(`could not load data from ${path} init with "${defaultWord}"`)
    initWord({name: defaultWord, id: defaultWord});
  }
  console.log(`start scrapping with ${wordsId.length} words`)
}

export function saveInFile(path: string) {
  writeFileSync(path, Array.from(network.keys()).map(id => {
    const value = network.get(id);
    const {isVisited, name, words} = value;
    return `${isVisited ? 1 : 0},${id},${name},${Array.from(words).join(',')}`
  }).join('\n'), 'utf-8');
  console.log(`saved ${network.size} words in ${path}`)
}

export function getFirstIndex() {
  let index = 0;
  for (const id of wordsId) {
    if (!network.get(id).isVisited) return index;
    index++;
  }
}

export function createLink(word1: Word, word2: Word) {
  addLink(word1, word2)
  addLink(word2, word1)
}

function addLink(fromWord: Word, toWord: Word) {
  initWord(fromWord)
  network.get(fromWord.id).words.add(toWord.name);
}

function initWord(word: Word) {
  const {id, name} = word;
  if (!network.get(id)) {
    network.set(id, {name, isVisited: false, words: new Set()});
    wordsId.push(id)
  }
}