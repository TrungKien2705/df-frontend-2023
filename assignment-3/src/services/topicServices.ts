import {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import axios from "../axios";
import {Topic} from "../types/topic";

export const getAllTopic = async (): Promise<Topic[] | any> =>{
    try {
        const response: AxiosResponse<Topic[]>  = await axios.get('/api/topic');
        if (!response) {
            toast.error('Request failed');
        }
        return response;
    } catch (error) {
        toast.error("Error get all Topic");
    }
}