import axios from "axios";
import {BASE_SERVER_URL} from "../../constant/BASE_SERVER_URL";

const instance = axios.create({
    baseURL: BASE_SERVER_URL
})

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance