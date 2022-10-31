// import { API_URL } from '../../config';
// import axios from 'axios';
import { vegaInstance } from "../AxiosConfig";

export const Service = {
    forgotPassword
};
const servicePattern = {
    forgotPassword: "employees/forgot_password",
};

function forgotPassword(data) {
    // return axios.post(`${API_URL}/user/forgot_password`,data)
    return vegaInstance.post(servicePattern.forgotPassword, data);
}
