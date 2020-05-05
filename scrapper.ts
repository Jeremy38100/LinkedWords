import { Page } from 'puppeteer';

export interface LinkedWords {
  definition: string;
  words: { [key: string]: string; }
}

export async function getLinkedWords(page: Page, word: string): Promise<LinkedWords[]> {
  await page.goto(`https://www.linternaute.fr/dictionnaire/fr/definition/${word}`,  {waitUntil: 'domcontentloaded'});
  return await page.evaluate(() => {
    const linkedWords: LinkedWords[] = [];

    for (const sens of Array.from(document.querySelector('.dico_liste').querySelectorAll('.grid_last'))) {
      const definition = (sens as HTMLDivElement).innerText.split('\n')[0] || ''
      const synonymStart = Array.from(sens.querySelectorAll('strong')).filter(s => s.innerText.startsWith('Synonyme'))[0]
      if (!synonymStart) continue
      const words = {};
      let nextSynonym = synonymStart.nextElementSibling
      while (nextSynonym && nextSynonym.tagName === 'A') {
        const id = nextSynonym.getAttribute('href').split('/').slice(-2)[0]
        const name = (nextSynonym as HTMLDivElement).innerText
        words[id] = name;
        nextSynonym = nextSynonym.nextElementSibling
      }
      linkedWords.push({ definition, words })
    }

    return linkedWords
  });
}