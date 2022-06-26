import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import loginSlice from './slices/Login.slice';
import signUpSlice from './slices/SignUp.slice';
import authorizationSlice from './slices/Authorization.slice'
import forgotPasswordSlice from './slices/ForgotPassword.slice';

import rootSaga from "./Sagas/RootSaga";
let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const allReducer = {
    loginSlice,
    signUpSlice,
    forgotPasswordSlice,
    authorizationSlice
  }
const store = configureStore({
    reducer: allReducer,
    middleware
})
sagaMiddleware.run(rootSaga);
export default store