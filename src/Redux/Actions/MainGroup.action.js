import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes';

export const openModalAddMainGroup = createAction(ACTION_TYPES.OPEN_ADD_MAINGOURP)
export const closeModalAddMainGroup = createAction(ACTION_TYPES.CLOSE_ADD_MAINGOURP)