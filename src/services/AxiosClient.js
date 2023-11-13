import axios from 'axios';
const AxiosClient = axios.create({
    baseURL: 'http://localhost:3009', 
});
export default AxiosClient;