import {toast} from "react-toastify";
import  { AxiosResponse } from 'axios';
import axios from "../axios";
import {Book, postData} from "../types/books";

export const getAllBooks = async (): Promise<Book[] | any> => {
    try {
        const response: AxiosResponse<Book[]>  = await axios.get('/api/books');
        if (!response) {
            toast.error('Request failed');
        }
        return response;
    } catch (error) {
        toast.error("Error get all Books");
    }
}
export const getBookById = (id: number) =>{
    return axios.get(`/api/books/${id}`);
}
export const postCreateBook = async (data: postData): Promise<postData | any> =>{
    try {
        const response: AxiosResponse<Book[]>  = await axios.post('/api/books', data);
        if (!response) {
            toast.error('Request failed');
        }
        toast.success("Create book success!");
        return response;
    } catch (error) {
        toast.error("An error occurred while creating the book.");
    }
}
export const putUpdateBook = async (data: postData, id: number): Promise<postData | any>  =>{
    try {
        const response: AxiosResponse<Book[]>  = await axios.put(`/api/books/${id}`, data);
        if (!response) {
            toast.error('Request failed');
        }
        toast.success("Update book success!");
        return response;
    } catch (error) {
        toast.error("An error occurred while updating the book.");
    }
}

export const deleteBook = async (id: number) =>{
    try {
        const response: AxiosResponse<Book[]>  = await axios.delete(`/api/books/${id}`);
        if (!response) {
            toast.error('Request failed');
        }
        toast.success("Delete book success!");
        return response;
    } catch (error) {
        toast.error("An error occurred while deleting the book.");
    }
}
