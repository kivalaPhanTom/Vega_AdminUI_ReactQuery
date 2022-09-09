import { API_URL } from '../.././config';
import axios from 'axios';

export const Service = {
    createMainGroup,
    deleteMainGroup,
    searchAndPaginationMainGroup
};

function createMainGroup(data) {
    return axios.post(`${API_URL}/maingroup/create`, data,{ withCredentials: true })
}

function deleteMainGroup(data) {
    return axios.post(`${API_URL}/maingroup/delete`, data,{ withCredentials: true })
}

function searchAndPaginationMainGroup(data) {
    return axios.post(`${API_URL}/maingroup/searchAndPagination`, data,{ withCredentials: true })
}

// /maingroup/searchAndPagination