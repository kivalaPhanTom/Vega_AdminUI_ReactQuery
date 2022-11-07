import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes/Employees';

export const updateDataInput = createAction(ACTION_TYPES.UPDATE_INPUT_DATA)
export const updateDataEdit = createAction(ACTION_TYPES.UPDATE_EDIT_DATA)
export const setModalAdd = createAction(ACTION_TYPES.SET_ADD)
export const setModalEdit = createAction(ACTION_TYPES.SET_EDIT)
export const setModalDelete = createAction(ACTION_TYPES.SET_DELETE)
export const create = createAction(ACTION_TYPES.CREATE)
export const createSuccess = createAction(ACTION_TYPES.CREATE_SUCCESS)
export const createFail = createAction(ACTION_TYPES.CREATE_FAIL)
export const edit = createAction(ACTION_TYPES.EDIT)
export const editSuccess = createAction(ACTION_TYPES.EDIT_SUCCESS)
export const editFail = createAction(ACTION_TYPES.EDIT_FAIL)
export const searchBySocket = createAction(ACTION_TYPES.SEARCH_BY_SOCKET)
export const searchSuccessBySocket = createAction(ACTION_TYPES.SEARCH_SUCCESS_BY_SOCKET)
export const searchFailBySocket = createAction(ACTION_TYPES.SEARCH_FAIL_BY_SOCKET)
export const deleteData = createAction(ACTION_TYPES.DELETE)
export const deleteDataSuccess = createAction(ACTION_TYPES.DELETE_SUCCESS)
export const deleteDataFail = createAction(ACTION_TYPES.DELETE_FAIL)
export const resetData = createAction(ACTION_TYPES.RESSET_DATA)
export const searchAndPaginationData = createAction(ACTION_TYPES.SEARCH_AND_PAGINATION)
export const searchAndPaginationDataSuccess = createAction(ACTION_TYPES.SEARCH_AND_PAGINATION_SUCCESS)
export const searchAndPaginationDataFailed = createAction(ACTION_TYPES.SEARCH_AND_PAGINATION_FAILED)
export const updatePagination = createAction(ACTION_TYPES.UPDATE_PAGINATION)
export const cacheDataEdit = createAction(ACTION_TYPES.CACHE_DATA_EDIT)
