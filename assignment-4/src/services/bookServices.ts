import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import axios from '../axios'
import { Book, postData } from '../types/books'

export const getAllBooks = async (): Promise<Book[] | undefined> => {
  try {
    const response: AxiosResponse<Book[]> = await axios.get('/books')
    if (!response.data) {
      toast.error('Request failed')
    }
    return response.data
  } catch (error) {
    toast.error('Error get all Books')
  }
}
export const getBookById = async (
  id: number | string,
): Promise<Book | undefined> => {
  try {
    const response: AxiosResponse<Book> = await axios.get(`/books/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    // toast.error('Error get Books')
  }
}
export const postCreateBook = async (
  data: postData,
): Promise<Book[] | undefined> => {
  try {
    const response: AxiosResponse<Book[]> = await axios.post('/books', data)
    if (!response.data) {
      toast.error('Request failed')
      return undefined
    }
    toast.success('Create book success!')
    return response.data
  } catch (error) {
    toast.error('An error occurred while creating the book.')
    return undefined
  }
}
export const putUpdateBook = async (
  data: postData,
  id: number,
): Promise<Book[] | undefined> => {
  try {
    const response: AxiosResponse<Book[]> = await axios.put(
      `/books/${id}`,
      data,
    )
    if (!response.data) {
      toast.error('Request failed')
      return undefined
    }
    toast.success('Update book success!')
    return response.data
  } catch (error) {
    toast.error('An error occurred while updating the book.')
    return undefined
  }
}

export const deleteBook = async (id: number) => {
  try {
    const response: AxiosResponse<Book[]> = await axios.delete(`/books/${id}`)
    if (!response.data) {
      toast.error('Request failed')
    }
    toast.success('Delete book success!')
    return response.data
  } catch (error) {
    toast.error('An error occurred while deleting the book.')
  }
}
