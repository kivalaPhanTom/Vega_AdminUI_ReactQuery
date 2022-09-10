import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes/Authorization';

export const getAuthorization = createAction(ACTION_TYPES.CHECK_AUTHORIZATION)
export const getAuthorizationSuccess = createAction(ACTION_TYPES.CHECK_AUTHORIZATION_SUCCESS)