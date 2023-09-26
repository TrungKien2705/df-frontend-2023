import axios from "axios";

const instance = axios.create({
    baseURL: 'https://650eb15354d18aabfe9961e6.mockapi.io',
});
instance.interceptors.response.use((response) => {
    return response.data;
});
export default instance;