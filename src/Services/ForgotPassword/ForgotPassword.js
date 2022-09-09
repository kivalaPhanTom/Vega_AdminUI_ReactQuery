import { API_URL } from '../../config';
import axios from 'axios';

export const Service = {
    forgotPassword
};
function forgotPassword(data) {
    return axios.post(`${API_URL}/user/forgot_password`,data)
}
