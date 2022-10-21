import { vegaInstance } from "../AxiosConfig";

export const Service = {
    createStatus,
    deleteStatus,
    searchAndPaginationStatus,
    editStatus,
};
const servicePattern = {
    create:"status/create",
    delete: "status/delete",
    searchAndPagination:"status/searchAndPagination",
    edit:"status/edit",
    search:"status/searchDataMainGroup"
};

function createStatus(data) {
    return vegaInstance.post(servicePattern.create, data);
}

function deleteStatus(data) {
    return vegaInstance.post(servicePattern.delete, data);
}

function searchAndPaginationStatus(data) {
    return vegaInstance.post(servicePattern.searchAndPagination, data);
}
function editStatus(data) {
    return vegaInstance.post(servicePattern.edit, data);
}


