export interface Music {
  id?: string,
  title: string,
  author: string,
  date?: string,
  file: string,
  genre: string[],
  album: string
}

export interface Answer {
  message: string
}