import { API_URL } from '../../config';
import axios from 'axios';

export const Service = {
    changePassword
};

function changePassword(data) {
    return axios.post(`${API_URL}/user/changePassword`, data, { withCredentials: true })
}

