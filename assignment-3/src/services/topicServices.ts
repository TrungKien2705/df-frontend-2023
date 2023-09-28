import axios from "../axios";

export const getAllTopic = () =>{
    return axios.get('/api/topic');
}