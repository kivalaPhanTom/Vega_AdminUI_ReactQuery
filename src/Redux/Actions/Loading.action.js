import { createAction } from '@reduxjs/toolkit';
// import * as ACTION_TYPES from '../ActionTypes';
import * as ACTION_TYPES from '../ActionTypes/Loading';

export const loading = createAction(ACTION_TYPES.LOADING)
export const closeLoading = createAction(ACTION_TYPES.CLOSE_LOADING)
