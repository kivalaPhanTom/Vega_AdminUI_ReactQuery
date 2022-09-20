import axios from 'axios';
import { API_URL } from '../config';

export const vegaInstance = axios.create({
    method: "post",
    baseURL: API_URL,
    timeout: process.env.TIMEOUT,
    withCredentials: true ,
    headers: {
        "Content-Type": "application/json",
    },
});