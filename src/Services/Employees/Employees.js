import { vegaInstance } from "../AxiosConfig";
// import { API_URL } from '../../config';
// import { TIMEOUT, API_URL, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../../config';
import { TIMEOUT, API_URL, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../../config';
import axios from 'axios';
export const Service = {
    createEmployee,
    editEmployee,
    deleteEmployee,
    uploadImage,
    deleteImage
};
const servicePattern = {
    create: "employees/create",
    delete: "employees/delete",
    edit:"employees/edit",
};

// function forgotPassword(data) {
//     // return axios.post(`${API_URL}/user/forgot_password`,data)
//     return vegaInstance.post(servicePattern.forgotPassword, data);
// }

function createEmployee(data) {
    return vegaInstance.post(servicePattern.create, data);
}
function uploadImage(data) {
    return axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,data)
}
function deleteEmployee(data) {
    return vegaInstance.post(servicePattern.delete, data);
}
function editEmployee(data) {
    return vegaInstance.post(servicePattern.edit, data);
}
function deleteImage(data) {
    return  axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/destroy`, data) 
}