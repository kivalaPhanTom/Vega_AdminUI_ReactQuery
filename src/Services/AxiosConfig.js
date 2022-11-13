import axios from 'axios';
import { API_URL } from '../config';
import { TIMEOUT } from '../config';
import { MethodCommon } from "../Common/methods";

let tokenLogin = MethodCommon.getCookie('tokenVega')
export const vegaInstance = axios.create({
    method: "post",
    baseURL: API_URL,
    timeout: TIMEOUT,
    withCredentials: true ,
    headers: {
        "Content-Type": "application/json",
        "Authorization": tokenLogin
    },
});