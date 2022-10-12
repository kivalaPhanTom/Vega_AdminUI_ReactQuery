import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import loginSlice from './slices/Login.slice';
import signUpSlice from './slices/SignUp.slice';
import authorizationSlice from './slices/Authorization.slice'
import forgotPasswordSlice from './slices/ForgotPassword.slice';
import loadingSlice from './slices/Loading.slice';
import changePasswordSlice from './slices/ChangePassword.slice';
import mainGroupSlice from './slices/MainGroup.slice';
import statusSlice from './slices/Status.slice';

import rootSaga from "./Sagas/RootSaga";
let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const allReducer = {
    loginSlice,
    signUpSlice,
    forgotPasswordSlice,
    authorizationSlice,
    loadingSlice,
    changePasswordSlice,
    mainGroupSlice,
    statusSlice
  }
const store = configureStore({
    reducer: allReducer,
    middleware
})
sagaMiddleware.run(rootSaga);
export default store