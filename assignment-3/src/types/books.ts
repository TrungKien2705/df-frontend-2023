
export interface Book {
    id: number;
    name: string;
    topic_id: number,
    author: string;
}
export interface postData{
    name: string,
    author: string,
    topic_id: number
}
export const initialBook: Book = {
    id: 0,
    name: '',
    topic_id: 0,
    author: '',
};