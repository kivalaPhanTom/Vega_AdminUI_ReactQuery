import { API_URL } from '../../config';
import axios from 'axios';

export const Service = {
    loginAuthenticate,
    loginTrandition,
    loginAuthorization,
};

function loginAuthenticate(data) {
    return axios.post(`${API_URL}/user/authenticate`, data, { withCredentials: true })
}
function loginTrandition(data) {
    return axios.post(`${API_URL}/user/login_trandition`, data, { withCredentials: true })
}
function loginAuthorization(data) {
    return axios.post(`${API_URL}/user/authorization`, data, { withCredentials: true })
}
