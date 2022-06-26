import { API_URL } from '../../../config';
import axios from 'axios';

export const Service = {
    loginFaceBook,
    loginAuthenticate,
    loginTrandition,
    loginAuthorization
};
function loginFaceBook(data) {
    return axios.get(`${API_URL}/user/login_fb`, data)
}
function loginAuthenticate(data) {
    return axios.post(`${API_URL}/user/authenticate`, data, { withCredentials: true })
}
function loginTrandition(data) {
    return axios.post(`${API_URL}/user/login_trandition`, data, { withCredentials: true })
}
function loginAuthorization(data) {
    return axios.post(`${API_URL}/user/authorization`, data, { withCredentials: true })
}
