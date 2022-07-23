import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes';

export const openModalAddMainGroup = createAction(ACTION_TYPES.OPEN_ADD_MAINGOURP)
export const closeModalAddMainGroup = createAction(ACTION_TYPES.CLOSE_ADD_MAINGOURP)
export const createMainGroup = createAction(ACTION_TYPES.CREATE_MAIN_GROUP)
export const createMainGroupSuccess = createAction(ACTION_TYPES.CREATE_MAIN_GROUP_SUCCESS)
export const createMainGroupFail = createAction(ACTION_TYPES.CREATE_MAIN_GROUP_FAIL)
export const searchMainGroup = createAction(ACTION_TYPES.SEARCH_MAIN_GROUP)