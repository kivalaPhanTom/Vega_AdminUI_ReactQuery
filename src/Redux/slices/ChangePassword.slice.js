import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../Services/ChangePassword/ChangePassword'
import { MessageCommon } from "../../Common/message";
import * as actionChangePassword from '../Actions/ChangePassword';
import { RESULT_STATUS } from '../../Common/Common_Parameter';
import { MethodCommon } from "../../Common/methods";
import * as actionLoading from '../Actions/Loading.action'

const ln = MethodCommon.getLanguage()
const initialState = {}

function* handleChangePassword(action){
    try {
        yield put(actionLoading.loading({}))
        const res = yield call(Service.changePassword, action.payload);
        const status = res.data
        switch (status.result) {
            case RESULT_STATUS.SUCCESS:
                yield put(actionLoading.closeLoading({}))
                yield put(actionChangePassword.changePasswordSuccess(ln.messageModule.CHANGE_PASSWORD_SUCCESS));
                break;

            case RESULT_STATUS.PASSWORD_ERROR:
                yield put(actionLoading.closeLoading({}))
                yield put(actionChangePassword.changePasswordFail(ln.messageModule.ERROR_PASSWORD));
                break;

            case RESULT_STATUS.ACCOUNT_NOT_FOUND:
                yield put(actionLoading.closeLoading({}))
                yield put(actionChangePassword.changePasswordFail(ln.messageModule.ACCOUNT_NOT_FOUND));
                break;
            
            case RESULT_STATUS.ERROR_SYSTEM:
                yield put(actionLoading.closeLoading({}))
                yield put(actionChangePassword.changePasswordFail(ln.messageModule.ERROR_SYSTEM));
                break;
            default:
                yield put(actionLoading.closeLoading({}))
                yield put(actionChangePassword.changePasswordFail(ln.messageModule.ERROR_SYSTEM));
                break;
        }
    } catch (error) {
        yield put(actionChangePassword.changePasswordFail(ln.messageModule.ERROR_SYSTEM));
    }
}

export function* changePasswordSaga() {
    yield takeEvery(actionChangePassword.changePassword, handleChangePassword);
}

const changePasswordSlice = createSlice({
    name: "changePassword",
    initialState,
    extraReducers: {
      [actionChangePassword.changePasswordFail]: (state, action) => {
        MessageCommon.openNotificationError(action.payload)
      },
      [actionChangePassword.changePasswordSuccess]: (state, action) => {
        MessageCommon.openNotificationSuccess(action.payload)
        setTimeout(() => window.location.href = "/login", 400);
      },
    },
  });
  const { reducer } = changePasswordSlice;
  export default reducer;