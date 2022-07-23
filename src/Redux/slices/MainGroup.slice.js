import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
// import { Service } from '../../components/Register/Services/Services'
import { Service } from '../../Services/MainGroup/MainGroup'
import { MessageCommon } from "../../components/Common/message";
import * as actionMainGroup from '../Actions/MainGroup.action';
import { RESULT_STATUS } from "../../components/Common/Common_Parameter";
import { MethodCommon } from "../../components/Common/methods";
import * as actionLoading from '../Actions/Loading.action';
import { SocketContext } from '../../SocketConfig/socket';
import { useContext } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";
// import io from 'socket.io-client';
// const socket = io();

const ln = MethodCommon.getLanguage()
const initialState = {
    isOpenAddMainGroup:false,
}
function* handleCreateMainGroup(action){
      const { data } = action.payload
      const socket = socketIOClient(ENDPOINT);
      // const socket = useContext(SocketContext);
      try {
         yield put(actionLoading.loading({}))
         const res = yield call(Service.createMainGroup, data);
         console.log("res:",res)
         socket.emit("fetchMainGroup", {} )
      // //    socket.emit("createMainGroup", data => {
      // //       console.log("data:",data)
      // //       // setResponse(data);
      // //     });
      //    console.log("res:",res)
      } catch (error) {
            
      }
}

// function* handleSignUp(action){
// //     try {
// //         yield put(actionLoading.loading({}))
// //         const res = yield call(Service.handleSignUp, action.payload);
// //         const status = res.data
// //         switch (status.result) {
// //             case RESULT_STATUS.SUCCESS:
// //                 yield put(actionLoading.closeLoading({}))
// //                 yield put(actionSignUp.signUpSuccess(ln.messageModule.SIGNUP_SUCCESS));
// //                 break;
// //             case RESULT_STATUS.DATA_EXIST:
// //                 yield put(actionLoading.closeLoading({}))
// //                 yield put(actionSignUp.signUpFail(ln.messageModule.EMAIL_EXIST));
// //                 break;
// //             case RESULT_STATUS.ERROR_SYSTEM:
// //                 yield put(actionLoading.closeLoading({}))
// //                 yield put(actionSignUp.signUpFail(ln.messageModule.ERROR_SYSTEM));
// //                 break;
// //             default:
// //                 yield put(actionSignUp.signUpFail(ln.messageModule.ERROR_SYSTEM));
// //                 break;
// //         }

// //    } catch (error) {
// //      yield put(actionSignUp.signUpFail(ln.messageModule.ERROR_SYSTEM));
// //    }
// }

export function* createMainGroup() {
    yield takeEvery(actionMainGroup.createMainGroup, handleCreateMainGroup);
}

const mainGroupSlice = createSlice({
    name: "maingroup",
    initialState,
    extraReducers: {
    //   [actionSignUp.signUpFail]: (state, action) => {
    //     MessageCommon.openNotificationError(action.payload)
    //   },
    //   [actionSignUp.signUpSuccess]: (state, action) => {
    //     MessageCommon.openNotificationSuccess(action.payload)
    //     setTimeout(() => window.location.href = "/login", 400);
    //   },

      [actionMainGroup.openModalAddMainGroup]: (state, action) => {
            let newState={...state}
            newState.isOpenAddMainGroup = true
            return newState
      },
      [actionMainGroup.closeModalAddMainGroup]: (state, action) => {
            let newState={...state}
            newState.isOpenAddMainGroup = false
            return newState
       
      },
    },
  });
  const { reducer } = mainGroupSlice;
  export default reducer;