import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://651a1efb340309952f0ce14e.mockapi.io',
})
instance.interceptors.response.use((response) => {
  return response
})
export default instance
