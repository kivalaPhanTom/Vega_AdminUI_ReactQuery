import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../components/ForgotPassword/Services/Services'
import { MessageCommon } from "../../components/Common/message";
import * as actionForgotPassword from '../Actions/ForgotPassword';
import { RESULT_STATUS } from '../../components/Common/Common_Parameter';
import { MethodCommon } from "../../components/Common/methods";
import * as actionLoading from '../Actions/Loading.action';

const ln = MethodCommon.getLanguage()
const initialState = {}
function* handleForgotPassword(action){
    try {
        yield put(actionLoading.loading({}))
        const res = yield call(Service.forgotPassword, action.payload);
        const status = res.data
        switch (status.result) {
            case RESULT_STATUS.SUCCESS:
                yield put(actionLoading.closeLoading({}))
                yield put(actionForgotPassword.forgotUpSuccess(ln.messageModule.RESET_PASSWORD_SUCCESS));
                break;
            case RESULT_STATUS.EMAIL_NOT_FOUND:
                yield put(actionLoading.closeLoading({}))
                yield put(actionForgotPassword.forgotFail(ln.messageModule.EMAIL_NOT_EXIST));
                break;
            case RESULT_STATUS.ERROR_SYSTEM:
                yield put(actionLoading.closeLoading({}))
                yield put(actionForgotPassword.forgotFail(ln.messageModule.ERROR_SYSTEM));
                break;
            default:
                yield put(actionLoading.closeLoading({}))
                yield put(actionForgotPassword.forgotFail(ln.messageModule.ERROR_SYSTEM));
                break;
        }
    } catch (error) {
        yield put(actionForgotPassword.forgotFail(ln.messageModule.ERROR_SYSTEM));
    }
}

export function* forgotPasswordSaga() {
    yield takeEvery(actionForgotPassword.forgotPassword, handleForgotPassword);
}

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    extraReducers: {
      [actionForgotPassword.forgotFail]: (state, action) => {
        MessageCommon.openNotificationError(action.payload)
      },
      [actionForgotPassword.forgotUpSuccess]: (state, action) => {
        MessageCommon.openNotificationSuccess(action.payload)
        setTimeout(() => window.location.href = "/login", 400);
      },
    },
  });
  const { reducer } = forgotPasswordSlice;
  export default reducer;