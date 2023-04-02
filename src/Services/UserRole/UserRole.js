import { vegaInstance } from "../AxiosConfig";

export const Service = {
    createUserRole,
    deleteUserRole,
    // searchAndPaginationStatus,
    editUserRole,
};
const servicePattern = {
    create:"userRole/create",
    delete: "userRole/delete",
    // searchAndPagination:"status/searchAndPagination",
    edit:"userRole/edit",
    // search:"status/searchDataMainGroup"
};

function createUserRole(data) {
    return vegaInstance.post(servicePattern.create, data);
}

function deleteUserRole(data) {
    return vegaInstance.post(servicePattern.delete, data);
}

// function searchAndPaginationStatus(data) {
//     return vegaInstance.post(servicePattern.searchAndPagination, data);
// }
function editUserRole(data) {
    return vegaInstance.post(servicePattern.edit, data);
}


