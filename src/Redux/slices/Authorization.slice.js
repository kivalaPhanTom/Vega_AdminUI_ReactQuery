import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import * as actionAuthorization from '../Actions/Authorization';
import { Service } from '../../components/Login/Services/Services';

const initialState = {
    Role:null
}
function* handleAuthorization(action){
  console.log("action:",action)
  try {
    const res = yield call(Service.loginAuthorization, action.payload);
    // const status = res.data
    // switch (status.result) {

    //     case RESULT_STATUS.SUCCESS:
    //         MethodCommon.saveLocalStorage("UserVega",status.data)
    //         yield put(actionLogin.loginTranditionSuccess(ln.messageModule.LOGIN_SUCCESS));
    //         break;

    //     case RESULT_STATUS.ACCOUNT_NOT_FOUND:
    //         yield put(actionLogin.loginTranditionFail(ln.messageModule.ACCOUNT_NOT_FOUND));
    //         break;

    //     case RESULT_STATUS.PASSWORD_ERROR:
    //         yield put(actionLogin.loginTranditionFail(ln.messageModule.ERROR_PASSWORD));
    //         break;

    //     default:
    //           yield put(actionLogin.loginTranditionFail(ln.messageModule.ERROR_SYSTEM));
    //           break;
    //       }
  } catch (error) {
    
  }

}
export function* checkAuthenticationSaga() {
  yield takeEvery(actionAuthorization.getAuthorization, handleAuthorization);
}
const authorizationSlice = createSlice({
    name: "authorization",
    initialState,
    extraReducers: {
      [actionAuthorization.getAuthorizationSuccess]: (state, action) => { 
         console.log("action:",action)
         
      },
    },
  });
  const { reducer } = authorizationSlice;
  export default reducer;