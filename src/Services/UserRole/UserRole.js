import { vegaInstance } from "../AxiosConfig";

export const Service = {
    createUserRole,
    deleteUserRole,
    searchAndPaginationUserRole,
    editUserRole,
};
const servicePattern = {
    create:"userRole/create",
    delete: "userRole/delete",
    searchAndPagination:"userRole/searchAndPagination",
    edit:"userRole/edit",
};

function createUserRole(data) {
    return vegaInstance.post(servicePattern.create, data);
}
function deleteUserRole(data) {
    return vegaInstance.post(servicePattern.delete, data);
}
function searchAndPaginationUserRole(data) {
    return vegaInstance.post(servicePattern.searchAndPagination, data);
}
function editUserRole(data) {
    return vegaInstance.post(servicePattern.edit, data);
}


