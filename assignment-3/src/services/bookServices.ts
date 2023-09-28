import axios from "../axios";
import { postData} from "../types/books";

export const getAllBooks =  ()=>{
    return axios.get('/api/books')
}
export const getBookById = (id: number) =>{
    return axios.get(`/api/books/${id}`);
}
export const postCreateBook = (data: postData) =>{
    return axios.post('/api/books', data)
}
export const putUpdateBook = (data: postData, id: number) =>{
    return axios.put(`/api/books/${id}`, data);
}

export const deleteBook = (id: number) =>{
    return axios.delete(`/api/books/${id}`);
}
