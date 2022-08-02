import { call, put, takeLatest, takeEvery, take,fork } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
// import { Service } from '../../components/Register/Services/Services'
import { Service } from '../../Services/MainGroup/MainGroup'
import { MessageCommon } from "../../Common/message";
import * as actionMainGroup from '../Actions/MainGroup.action';
import { RESULT_STATUS } from "../../Common/Common_Parameter";
import { MethodCommon } from "../../Common/methods";
// import {searchMainGroupSuccess } from "../Actions/MainGroup.action"
import * as actionLoading from '../Actions/Loading.action';


import {eventChannel} from 'redux-saga'
import socketIOClient from "socket.io-client";
import { AiOutlineConsoleSql } from 'react-icons/ai';

const ENDPOINT = "http://127.0.0.1:4000";
// import io from 'socket.io-client';
// const socket = io();

const ln = MethodCommon.getLanguage()
const initialState = {
     mainGroupList:[],
    isOpenAddMainGroup:false,
    isOpenConfirmDelete:false,
    isOpenConfirmEdit:false,
//     titleConfirm:"",
//     dataConfirm:null
}



// const socket = socketIOClient(ENDPOINT);
function connect() {
      const socket = socketIOClient(ENDPOINT);
      return new Promise(resolve => {
        socket.on('connect', () => { 
          resolve(socket);
          console.log("Socket connected");
          
        });
      });
}
function getMainGroupBySocket(socket){
      return new Promise(resolve => {
            socket.on('fetchMainGroup', (maingroup) => { 
              resolve(maingroup);
            });
      })
}
export function* fetchchMainGroupList(socket){
      while (true) { 
            const  resultSearch = yield call(getMainGroupBySocket,socket)
            yield put(actionMainGroup.searchMainGroupSuccess(resultSearch));
      }
}
export function handleSearchMainGroup(socket){
      socket.emit("fetchMainGroup", {} )
}

// function* handleCreateMainGroup(action){
//       const { data } = action.payload
//       // socket.emit("insert-todo", data )
//       // const socket = useContext(SocketContext);
//       try {
//          yield put(actionLoading.loading({}))
//          const res = yield call(Service.createMainGroup, data);
//          yield fork(fetchchMainGroupList, socket)
//       //    yield call(handleSearchMainGroup,{})
//       //    const a = yield call(getMainGroupBySocket)
//       //    console.log("a:",a)
//       //    yield put(actionMainGroup.searchMainGroupSuccess(a));
//       //    console.log("res:",res)
        
//          yield put(actionMainGroup.closeModalAddMainGroup({}));
       
//       //    yield put(actionMainGroup.searchMainGroup({}));
//       // //    socket.emit("createMainGroup", data => {
//       // //       console.log("data:",data)
//       // //       // setResponse(data);
//       // //     });
//       //    console.log("res:",res)
//       } catch (error) {
            
//       }
// }
function* handleCreateMainGroup(socket){
      const { payload } = yield take(actionMainGroup.createMainGroup)
      const { data }  =  payload
      try {
            
            yield put(actionLoading.loading({}))
            // socket.emit("create-maingroup", data )
            const res = yield call(Service.createMainGroup, data);
            // yield put(actionMainGroup.searchMainGroup({}));
            yield fork(handleSearchMainGroup, socket)



            // yield fork(handleSearchMainGroup, socket)
            // console.log("tao api xong")
            // // yield fork(fetchchMainGroupList, socket)
            // // console.log("vô nưazz")
            // console.log("socketAfter:",socket)
            // const  a = yield call(getMainGroupBySocket,socket)
            // console.log("a",a)
            // yield put(actionMainGroup.searchMainGroupSuccess(a));
            yield put(actionMainGroup.closeModalAddMainGroup({}));
         } catch (error) {
               
         }
}
function* handleDeleteMainGroup(socket){
      const { payload } = yield take(actionMainGroup.deleteMainGroup)
      const { data }  =  payload
      console.log("data:",data)
      try {
            
            yield put(actionLoading.loading({}))
            const res = yield call(Service.deleteMainGroup, data);
            if(res.data.result === RESULT_STATUS.SUCCESS ){
                  yield fork(handleSearchMainGroup, socket)
                  yield put(actionMainGroup.deleteMainGroupSuccess("Xóa thành công"))
                  // ln.messageModule.RESET_PASSWORD_SUCCESS
                  yield put(actionLoading.closeLoading({}))
                  yield put(actionMainGroup.closeConfirmDelete())
                  // yield put(actionMainGroup.closeModalAddMainGroup({}));
            }else{
                  yield put(actionMainGroup.deleteMainGroupFail("Xóa không thành công"))
                  
            }
            console.log("res:",res)
            // yield fork(handleSearchMainGroup, socket)
            // yield put(actionMainGroup.closeModalAddMainGroup({}));
            
         } catch (error) {
               
         }
}

// export function* createMainGroup() {
//     yield takeEvery(actionMainGroup.createMainGroup, handleCreateMainGroup);
// }
export function* flowMainGroup() {
      // yield take(GET_TODOS)
      // yield take('SEARCH_MAIN_GROUP')
      const socket = yield call(connect)
      // console.log("socketFirst:",socket)
      yield fork(handleSearchMainGroup, socket)
      yield fork(handleDeleteMainGroup, socket)
      // yield fork(handleCreateMainGroup, socket)
      yield fork(handleCreateMainGroup, socket)
      yield fork(fetchchMainGroupList, socket)
      
      // yield fork(write, socket)
    }

const mainGroupSlice = createSlice({
    name: "maingroup",
    initialState,
    extraReducers: {
      [actionMainGroup.searchMainGroupSuccess]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = index
            });
            newState.mainGroupList = action.payload.docs
            return newState
      },
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
      [actionMainGroup.deleteMainGroupSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionMainGroup.deleteMainGroupFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionMainGroup.openConfirmDelete]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmDelete = true
            return newState
      },
      [actionMainGroup.closeConfirmDelete]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmDelete = false
            return newState
      },
      [actionMainGroup.openConfirmEdit]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmEdit = true
            return newState
      },
      [actionMainGroup.closeConfirmEdit]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmEdit = false
            return newState
      },
    },
  });
  const { reducer } = mainGroupSlice;
  export default reducer;