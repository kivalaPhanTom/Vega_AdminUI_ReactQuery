import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes';

export const signUp = createAction(ACTION_TYPES.SIGN_UP)
export const signUpSuccess = createAction(ACTION_TYPES.SIGN_UP_SUCCESS)
export const signUpFail = createAction(ACTION_TYPES.SIGN_UP_FAIL)