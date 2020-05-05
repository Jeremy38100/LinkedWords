export interface NetworkWord {
  name: string
  isVisited: boolean
  words: Set<string> // names
}

export interface Word {
  id: string
  name: string
}

export interface Current {
  id: string
  networkWord: NetworkWord
  word: Word
}