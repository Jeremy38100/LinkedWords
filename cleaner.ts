import { readFileSync, writeFileSync } from "fs";

const inputFile = './data/cache.txt'
const outputFile = './data/data.txt'

writeFileSync(outputFile, readFileSync(inputFile, 'utf8')
  .split('\n')
  .map(line => {
    const [isVisited, id, ...words] = line.split(',').map(w => w.trim());
    return isVisited == '1' ? words : []
  })
  .filter(w => w.length)
  .join('\n'),
'utf-8');