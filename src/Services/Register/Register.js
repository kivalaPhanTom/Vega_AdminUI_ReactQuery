import { API_URL } from '../../config';
import axios from 'axios';

export const Service = {
    handleSignUp
};

function handleSignUp(data) {
    return axios.post(`${API_URL}/user/register`,data, { withCredentials: true })
}

