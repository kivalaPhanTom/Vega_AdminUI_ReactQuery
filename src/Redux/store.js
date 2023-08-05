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
import employeesSlice from './slices/Employees.slice';
import userRoleSlice from './slices/UserRole.slice'
import rootSaga from "./Sagas/RootSaga";
import { isRejectedWithValue } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!')
  }
  return next(action)
}
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
    statusSlice,
    employeesSlice,
    userRoleSlice
  }
const store = configureStore({
    reducer: allReducer,
    middleware
})
sagaMiddleware.run(rootSaga);
export default store