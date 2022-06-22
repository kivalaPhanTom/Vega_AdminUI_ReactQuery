import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../components/ForgotPassword/Services/Services'
import { MessageCommon } from "../../components/Common/message";
import * as actionForgotPassword from '../Actions/ForgotPassword';
import { API_URL } from '../../config';
const initialState = {
    // isShowPopUp:false,
    // isShowPopUpEdit:false,
    // data:[],
    // signalAddSuccess:false,
    // signnalEditSucces:false,
    // totalDataState:0
}
function* handleForgotPassword(action){
    try {
        const res = yield call(Service.forgotPassword, action.payload);
        const status = res.data
        switch (status.result) {
            case 1:
                yield put(actionForgotPassword.forgotUpSuccess("Bạn đã được cấp mật khẩu mới, vui lòng kiểm tra email"));
                break;
            case 6:
                yield put(actionForgotPassword.forgotFail("Email không tồn tại trong hệ thống"));
                break;
            case 7:
                yield put(actionForgotPassword.forgotFail("Lỗi hệ thống"));
                break;
            default:
                yield put(actionForgotPassword.forgotUpSuccess("Đăng ký thành công"));
                break;
        }
    } catch (error) {
        yield put(actionForgotPassword.forgotFail("Lỗi hệ thống"));
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
      },
    },
  });
  const { reducer } = forgotPasswordSlice;
  export default reducer;