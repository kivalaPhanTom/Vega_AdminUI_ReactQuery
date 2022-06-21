import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes';

export const forgotPassword = createAction(ACTION_TYPES.FORGOT_PASSWORD)
export const forgotUpSuccess = createAction(ACTION_TYPES.FORGOT_PASSWORD_SUCCESS)
export const forgotFail = createAction(ACTION_TYPES.FORGOT_PASSWORD_FAIL)