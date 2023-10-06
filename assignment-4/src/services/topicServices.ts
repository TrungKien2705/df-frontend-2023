import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import axios from '../axios'
import { Topic } from '../types/topic'

export const getAllTopic = async (): Promise<Topic[] | undefined> => {
  try {
    const response: AxiosResponse<Topic[]> = await axios.get('/topics')
    if (!response.data) {
      toast.error('Request failed')
    }
    return response.data
  } catch (error) {
    toast.error('Error get all Topic')
  }
}
