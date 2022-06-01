import { API_URL } from '../../../config';
import axios from 'axios';

export const Service = {
    loginFaceBook
};
// function getList(searchModel) {
//     return axios.post(`${API_URL}/Grammar/getList`,searchModel)
// }

function loginFaceBook(data) {
    return axios.get(`${API_URL}/user/login_fb`,data)
}