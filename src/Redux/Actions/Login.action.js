import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes';

export const loginFacebook = createAction(ACTION_TYPES.LOGIN_FACEBOOK)
export const loginGoogle = createAction(ACTION_TYPES.LOGIN_GOOGLE)