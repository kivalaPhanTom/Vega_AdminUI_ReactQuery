// import { API_URL } from '../../config';
// import axios from 'axios';
import { vegaInstance } from "../AxiosConfig";

export const Service = {
    changePassword
};
const servicePattern = {
    changePassword: "employees/changePassword",
};

function changePassword(data) {
    // return axios.post(`${API_URL}/user/changePassword`, data, { withCredentials: true })
    return vegaInstance.post(servicePattern.changePassword, data);
}

