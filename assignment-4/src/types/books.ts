export interface Book {
  id: number
  name: string
  topic: string
  author: string
  thumbnail: string
  description: string
}
export interface postData {
  name: string
  topic: string
  author: string
  thumbnail: string
  description: string
}
export interface BookSelect {
  name: string
  topic: string
  author: string
  thumbnail: string
  description: string
}
export const initialBook: Book = {
  id: 0,
  name: '',
  topic: '',
  author: '',
  thumbnail: '',
  description: '',
}
