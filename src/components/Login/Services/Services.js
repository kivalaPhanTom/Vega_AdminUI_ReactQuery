import { API_URL } from '../../../config';
import axios from 'axios';
// window.open(`${API_URL}/user/login_fb`, "_self"); window.open(`${API_URL}/user/login_gg`, "_self");
export const Service = {
    loginAuthenticate,
    loginTrandition,
    loginAuthorization,
    loginFaceBook,
    loginGoogle,
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

function loginFaceBook(data) {
    return axios.get(`${API_URL}/user/login_fb`, data, { withCredentials: true })
}
// function loginFaceBook(data) {
//     return axios.get(`${API_URL}/oauth2/redirect/facebook`, data, { withCredentials: true })
// }
function loginGoogle(data) {
    return axios.get(`${API_URL}/user/login_gg`, data, { withCredentials: true })
}
// function loginAuthorization(data) {
//     return axios.post(`${API_URL}/user/changePassword`, data, { withCredentials: true })
// }

