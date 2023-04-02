import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes/UserRole';

export const updateDataEdit = createAction(ACTION_TYPES.UPDATE_EDIT_DATA_USERROLE)
export const setModalAdd = createAction(ACTION_TYPES.SET_OPNEN_ADD_USERROLE)
export const create = createAction(ACTION_TYPES.CREATE_USERROLE)
export const createSuccess = createAction(ACTION_TYPES.CREATE_USERROLE_SUCCESS)
export const createFail = createAction(ACTION_TYPES.CREATE_USERROLE_FAIL)
export const edit = createAction(ACTION_TYPES.EDIT_USERROLE)
export const editSuccess = createAction(ACTION_TYPES.EDIT_USERROLE_SUCCESS)
export const editFail = createAction(ACTION_TYPES.EDIT_USERROLE_FAIL)
export const searchBySocket = createAction(ACTION_TYPES.SEARCH_USERROLE_BY_SOCKET)
export const searchSuccessBySocket = createAction(ACTION_TYPES.SEARCH_USERROLE_SUCCESS_BY_SOCKET)
export const searchFailBySocket = createAction(ACTION_TYPES.SEARCH_USERROLE_FAIL_BY_SOCKET)
export const deleteData = createAction(ACTION_TYPES.DELETE_USERROLE)
export const deleteDataSuccess = createAction(ACTION_TYPES.DELETE_USERROLE_SUCCESS)
export const deleteDataFail = createAction(ACTION_TYPES.DELETE_USERROLE_FAIL)
export const setConfirmDelete= createAction(ACTION_TYPES.SET_CONFIRM_DELETE_USERROLE)
export const setConfirmEdit = createAction(ACTION_TYPES.SET_CONFIRM_EDIT_USERROLE)
export const resetData = createAction(ACTION_TYPES.RESSET_DATA_USERROLE)
export const searchAndPaginationData = createAction(ACTION_TYPES.SEARCH_AND_PAGINATION_USERROLE)
export const searchAndPaginationDataSuccess = createAction(ACTION_TYPES.SEARCH_AND_PAGINATION_USERROLE_SUCCESS)
export const searchAndPaginationDataFailed = createAction(ACTION_TYPES.SEARCH_AND_PAGINATION_USERROLE_FAILED)
export const updatePagination = createAction(ACTION_TYPES.UPDATE_PAGINATION_USERROLE)
export const setModalFiltering = createAction(ACTION_TYPES.SET_MODAL_FILTERING)


export const getCreatedUserFiltering = createAction(ACTION_TYPES.GET_CREATED_USER_FILTERING)
export const getCreatedUserFilteringSuccess = createAction(ACTION_TYPES.GET_CREATED_USER_FILTERING_SUCCESS)


export const getUpdatedUserFiltering = createAction(ACTION_TYPES.GET_UPDATED_USER_FILTERING)
export const getUpdatedUserFilteringSuccess = createAction(ACTION_TYPES.GET_UPDATED_USER_FILTERING_SUCCESS)


export const setCreatedDateFiltering = createAction(ACTION_TYPES.SET_CREATED_DATE_FILTERING)
export const setUpdatedFiltering = createAction(ACTION_TYPES.SET_UPDATED_DATE_FILTERING)
