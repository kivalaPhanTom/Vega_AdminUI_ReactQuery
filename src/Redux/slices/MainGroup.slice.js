import { call, put, takeEvery, fork, all} from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../Services/MainGroup/MainGroup'
import connect from '../../Services/ConnectSocket/ConnectSocket'
import { MessageCommon } from "../../Common/message";
import * as actionMainGroup from '../Actions/MainGroup.action';
import { RESULT_STATUS } from "../../Common/Common_Parameter";
import { MethodCommon } from "../../Common/methods";
import * as actionLoading from '../Actions/Loading.action';

const ln = MethodCommon.getLanguage()
const initialState = {
     mainGroupList:[],
    isOpenAddMainGroup:false,
    isOpenConfirmDelete:false,
    isOpenConfirmEdit:false,
    data:{
      code:'',
      name:'',
      isActive:false,
      note:''
    }
}
const initialStateClone = JSON.parse(JSON.stringify(initialState))

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
export function handleEmitSearchMainGroup(socket){
      socket.emit("fetchMainGroup", {} )
}

function*  handleCreateMainGroup(params){
      const { socket, data} = params
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.createMainGroup, data);
            const  resultSignal = res.data.result
            switch (resultSignal) {
                  case RESULT_STATUS.SUCCESS:
                        yield fork(handleEmitSearchMainGroup, socket)
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionMainGroup.createMainGroupSuccess(ln.messageModule.CREATE_MAINGROUP_SUCCESS))
                        yield put(actionMainGroup.resetData({}));
                        yield put(actionMainGroup.closeModalAddMainGroup({}));
                        break;
                  case RESULT_STATUS.ERROR:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionMainGroup.createMainGroupFail(ln.messageModule.CREATE_MAINGROUP_FAIL))
                        break;
                  case RESULT_STATUS.DATA_EXIST:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionMainGroup.createMainGroupFail(ln.messageModule.MAINGROUP_CODE_EXIST))
                        break;
                  default:
                        break;
            }
           
         } catch (error) {
            yield put(actionMainGroup.createMainGroupFail(ln.messageModule.CREATE_MAINGROUP_FAIL))
         }
}

function* handleDeleteMainGroup(params){
      const { socket, data} = params
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.deleteMainGroup, data);
            if(res.data.result === RESULT_STATUS.SUCCESS ){
                  yield fork(handleEmitSearchMainGroup, socket)
                  yield put(actionMainGroup.deleteMainGroupSuccess(ln.messageModule.DELETE_MAINGROUP_SUCCESS))
                  yield put(actionLoading.closeLoading({}))
                  yield put(actionMainGroup.closeConfirmDelete())
            }else{
                  yield put(actionMainGroup.createMainGroupFail(ln.messageModule.DELETE_MAINGROUP_FAIL))   
            }
            
      } catch (error) {
               
      }
}

function* handleSocketCreateMainGroup(action){
      const { data } = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            socket
      }
      yield fork(handleCreateMainGroup, payload)
}

function* handleSocketDeleteMainGroup(action){
      const { data } = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            socket
      }
      yield fork(handleDeleteMainGroup,  payload)
}

function* createMainGroup() {
      yield takeEvery(actionMainGroup.createMainGroup, handleSocketCreateMainGroup);
}

function* deleteMainGroup() {
    yield takeEvery(actionMainGroup.deleteMainGroup, handleSocketDeleteMainGroup);
}

function* onFetchMainGroupList() {
      const socket = yield call(connect)
      yield fork(handleEmitSearchMainGroup, socket)
      yield fork(fetchchMainGroupList, socket)
}

export function* mainGroupSagaList() {
      yield fork(onFetchMainGroupList);
      yield all([deleteMainGroup(),createMainGroup()]);   
}

const mainGroupSlice = createSlice({
    name: "maingroup",
    initialState,
    extraReducers: {
      [actionMainGroup.updateDataInput]: (state, action) => {
            let newState={...state}
            newState.data = action.payload
            return newState
      },
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
      [actionMainGroup.createMainGroupSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionMainGroup.createMainGroupFail]: (state, action) => {
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
      [actionMainGroup.resetData]: (state, action) => {
            return initialStateClone
      },
    },
  });
  const { reducer } = mainGroupSlice;
  export default reducer;