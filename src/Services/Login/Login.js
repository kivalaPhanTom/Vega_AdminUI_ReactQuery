// import { API_URL } from '../../config';
// import axios from 'axios';
import { vegaInstance } from "../AxiosConfig";

export const Service = {
    loginAuthenticate,
    loginTrandition,
    loginAuthorization,
};
const servicePattern = {
    authenticate: "employees/authenticate",
    login: "login",
    authorization: "employees/authorization"
};

function loginAuthenticate(data) {
    // return axios.post(`${API_URL}/user/authenticate`, data, { withCredentials: true })
    return vegaInstance.post(servicePattern.authenticate, data);
}
function loginTrandition(data) {
    // return axios.post(`${API_URL}/user/login_trandition`, data, { withCredentials: true })
    return vegaInstance.post(servicePattern.login, data);
}
function loginAuthorization(data) {
    // return axios.post(`${API_URL}/user/authorization`, data, { withCredentials: true })
    return vegaInstance.post(servicePattern.authorization, data);
}
