import { vegaInstance } from "../AxiosConfig";
import axios from 'axios';
export const Service = {
    createEmployee,
    editEmployee,
    deleteEmployee,
    uploadImage
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
    return axios.post(`https://api.cloudinary.com/v1_1/dvvi0pivw/image/upload`,data)
}
function deleteEmployee(data) {
    return vegaInstance.post(servicePattern.delete, data);
}
function editEmployee(data) {
    return vegaInstance.post(servicePattern.edit, data);
}