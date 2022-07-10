import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes';

export const changePassword = createAction(ACTION_TYPES.CHANGE_PASSWORD)
export const changePasswordSuccess = createAction(ACTION_TYPES.CHANGE_PASSWORD_SUCCESS)
export const changePasswordFail = createAction(ACTION_TYPES.CHANGE_PASSWORD_FAIL)
