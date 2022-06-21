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
    console.log("action:",action)
    try {
        const res = yield call(Service.forgotPassword, action.payload);
        const status = res.data
        console.log("status:",status)
        // switch (status.result) {
        //     case 1:
        //         yield put(actionForgotPassword.signUpSuccess("Đăng ký thành công"));
        //         break;
        //     case 3:
        //         yield put(actionForgotPassword.signUpFail("Email đã tồn tại"));
        //         break;
        //     case 7:
        //         yield put(actionForgotPassword.signUpFail("Lỗi hệ thống"));
        //         break;
        //     default:
        //         yield put(actionForgotPassword.signUpSuccess("Đăng ký thành công"));
        //         break;
        // }


        // const res = yield call(Service.handleSignUp, action.payload);
        // const status = res.data
        // if(status.result === 1 ){ 
        //   yield put(actionForgotPassword.forgotFail("Thực hiện quên mật khẩu thành công, vui lòng kiểm tra email của bạn."));
        // } 
        // if(status.result === 3 ){
        //     yield put(actionForgotPassword.forgotUpSuccess("Thực hiện quên mật khẩu thất bại"));
        // }
        // console.log("data:",data.data)
   } catch (error) {
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