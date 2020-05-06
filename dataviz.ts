import { writeFileSync } from 'fs';
import { readFileSync, link } from 'fs';

const inputFile = './data/data.txt'
const outputFile = './data/dataviz.json'

const maxWords = 300;

const nodes = [];
const links = [];

const linksMap = new Map<string, Set<string>>();

function addLink(source: string, target: string) {
  const targetSet = linksMap.get(target);
  const fromSet = linksMap.get(source);
  if (!fromSet || !targetSet || targetSet.has(source)) return;
  fromSet.add(target);
  links.push({source, target})
}

function setNodes(data: string[][]) {
  let i=0;
  for (const words of data) {
    const id = words[0]
    nodes.push({id})
    linksMap.set(id, new Set())
    i++;
    if (i >= maxWords) return;
  }
}

function setLinks(data: string[][]) {
  let i=0;
  for (const words of data) {
    const [source, ...others] = words;
    others.forEach(target => addLink(source, target));
    i++;
    if (i >= maxWords) return;
  }
}

const data = readFileSync(inputFile, 'utf8')
    .split('\n')
    .map(line => line.split(','))
setNodes(data);
setLinks(data);

console.log(`export ${nodes.length} nodes & ${links.length} links`)

writeFileSync(outputFile, JSON.stringify({nodes, links}), 'utf-8')