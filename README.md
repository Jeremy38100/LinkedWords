# Linked Words 🔗📚

![Demo](https://github.com/Jeremy38100/LinkedWords/raw/master/demo/demo.gif)

## Structure
- `data/`
  - `cache.txt` : already visited words and associations
  - `data.txt` : visited only clean words

## Run Script
 - Define a number of words to explore in `script.ts`
 - run `ts-node script.ts`
 - export clean data with `ts-node cleaner.ts`

## Run Dataviz
 - Define a number of words to red `dataviz.ts`
 - run data formatting: `ts-node dataviz.ts`
 - run a webserver at the root (eg: `python -m SimpleHTTPServer 8000`)
 - visit (`eg http://localhost:8000/`)