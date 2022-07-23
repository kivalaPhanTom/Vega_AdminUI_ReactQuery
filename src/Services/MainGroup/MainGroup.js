import { API_URL } from '../.././config';
import axios from 'axios';

export const Service = {
    createMainGroup
};
function createMainGroup(data) {
    return axios.post(`${API_URL}/maingroup/create`, data,{ withCredentials: true })
}
