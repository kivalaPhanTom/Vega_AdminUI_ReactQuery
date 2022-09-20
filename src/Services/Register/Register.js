// import { API_URL } from '../../config';
// import axios from 'axios';
import { vegaInstance } from "../AxiosConfig";

export const Service = {
    handleSignUp
};
const servicePattern = {
   register: "user/register",
};
function handleSignUp(data) {
    // return axios.post(`${API_URL}/user/register`,data, { withCredentials: true })
    return vegaInstance.post(servicePattern.register, data);
}

