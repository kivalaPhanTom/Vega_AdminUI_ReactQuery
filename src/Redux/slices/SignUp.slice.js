import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../components/Register/Services/Services'
import { MessageCommon } from "../../components/Common/message";
import * as actionSignUp from '../Actions/SignUp.action';
import { RESULT_STATUS } from "../../components/Common/Common_Parameter";
import { MethodCommon } from "../../components/Common/methods";

const ln = MethodCommon.getLanguage()
const initialState = {}
function* handleSignUp(action){
    try {
        const res = yield call(Service.handleSignUp, action.payload);
        const status = res.data
        switch (status.result) {
            case RESULT_STATUS.SUCCESS:
                yield put(actionSignUp.signUpSuccess(ln.messageModule.SIGNUP_SUCCESS));
                break;
            case RESULT_STATUS.DATA_EXIST:
                yield put(actionSignUp.signUpFail(ln.messageModule.EMAIL_EXIST));
                break;
            case RESULT_STATUS.ERROR_SYSTEM:
                yield put(actionSignUp.signUpFail(ln.messageModule.ERROR_SYSTEM));
                break;
            default:
                yield put(actionSignUp.signUpFail(ln.messageModule.ERROR_SYSTEM));
                break;
        }

   } catch (error) {
     yield put(actionSignUp.signUpFail(ln.messageModule.ERROR_SYSTEM));
   }
}

export function* signUp() {
    yield takeEvery(actionSignUp.signUp, handleSignUp);
}

const signupSlice = createSlice({
    name: "register",
    initialState,
    extraReducers: {
      [actionSignUp.signUpFail]: (state, action) => {
        MessageCommon.openNotificationError(action.payload)
      },
      [actionSignUp.signUpSuccess]: (state, action) => {
        MessageCommon.openNotificationSuccess(action.payload)
      },
    },
  });
  const { reducer } = signupSlice;
  export default reducer;