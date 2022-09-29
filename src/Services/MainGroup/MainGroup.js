import { vegaInstance } from "../AxiosConfig";
import axios from 'axios';
import { API_URL } from '../../config';

export const Service = {
    createMainGroup,
    deleteMainGroup,
    searchAndPaginationMainGroup,
    editMainGroup,
};

const servicePattern = {
    create: "maingroup/create",
    delete: "maingroup/delete",
    searchAndPagination:"maingroup/searchAndPagination",
    edit:"maingroup/edit",
    search:"maingroup/searchDataMainGroup"
};

function createMainGroup(data) {
    // return axios.post(`${API_URL}/maingroup/create`, data,{ withCredentials: true })
    return vegaInstance.post(servicePattern.create, data);
}

function deleteMainGroup(data) {
    // return axios.post(`${API_URL}/maingroup/delete`, data,{ withCredentials: true })
    return vegaInstance.post(servicePattern.delete, data);
}

function searchAndPaginationMainGroup(data) {
    // return axios.post(`${API_URL}/maingroup/searchAndPagination`, data,{ withCredentials: true })
    return vegaInstance.post(servicePattern.searchAndPagination, data);
}
function editMainGroup(data) {
    // return axios.post(`${API_URL}/maingroup/edit`, data,{ withCredentials: true })
    return vegaInstance.post(servicePattern.edit, data);
}

