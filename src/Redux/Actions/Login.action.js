import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes/Login';

export const loginFacebook = createAction(ACTION_TYPES.LOGIN_FACEBOOK)
export const loginGoogle = createAction(ACTION_TYPES.LOGIN_GOOGLE)
export const loginTrandition = createAction(ACTION_TYPES.LOGIN_TRANDITION)
export const loginTranditionSuccess = createAction(ACTION_TYPES.LOGIN_TRANDITION_SUCCESS)
export const loginTranditionFail = createAction(ACTION_TYPES.LOGIN_TRANDITION_FAIL)
