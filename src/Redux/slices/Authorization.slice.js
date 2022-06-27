import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import * as actionAuthorization from '../Actions/Authorization';
import { Service } from '../../components/Login/Services/Services';
import { RESULT_STATUS } from "../../components/Common/Common_Parameter";

const initialState = {
    Role:null
}
function* handleAuthorization(action){
  try {
    const res = yield call(Service.loginAuthorization, action.payload);
    const status = res.data
    switch (status.result) {
        case RESULT_STATUS.SUCCESS:
            yield put(actionAuthorization.getAuthorizationSuccess(status.data));
            break;

        default:
              break;
    }
    
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
        let newState={...state}
        newState.Role = action.payload
        return newState
      },
    },
  });
  const { reducer } = authorizationSlice;
  export default reducer;