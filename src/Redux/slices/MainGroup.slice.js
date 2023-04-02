import { call, put, takeEvery, fork, all} from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../Services/MainGroup/MainGroup'
import connect from '../../Services/ConnectSocket/ConnectSocket'
import { MessageCommon } from "../../Common/message";
import * as actionMainGroup from '../Actions/MainGroup.action';
import { RESULT_STATUS } from "../../Common/Common_Parameter";
import { MethodCommon } from "../../Common/methods";
import * as actionLoading from '../Actions/Loading.action';
import { PAGINATION_DEFAULT } from "../../Common/Common_Parameter";

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
      },
      dataEdit:{
            id:'',
            code:'',
            name:'',
            isActive:false,
            note:''
      },
      totalData:0,
      pagination:{
            pageCurrent: PAGINATION_DEFAULT.pageCurrent,
            pageSize: PAGINATION_DEFAULT.pageSize,
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

function* fetchchMainGroupListBySocket(socket){ 
      while (true) { 
            try {
                  const  resultSearch = yield call(getMainGroupBySocket,socket)
                  yield put(actionMainGroup.searchMainGroupSuccessBySocket(resultSearch)); 
            } catch (error) {
                  yield put(actionMainGroup.searchMainGroupFailBySocket(ln.messageModule.ERROR_SYSTEM));
                  
            }
      }
}

function handleEmitSearchMainGroup(data){ 
      data.socket.emit("fetchMainGroup", data.pagination )
}

function*  handleCreateMainGroup(params){
      const { socket, data, pagination} = params
      const dataSocket ={
            socket,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.createMainGroup, data);
            const  resultSignal = res.data.result
            switch (resultSignal) {
                  case RESULT_STATUS.SUCCESS:
                        yield fork(handleEmitSearchMainGroup, dataSocket)
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
function*  handleEditMainGroup(params){
      const { socket, data, pagination} = params
      const dataSocket ={
            socket,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.editMainGroup, data);
            const  resultSignal = res.data.result
            switch (resultSignal) {
                  case RESULT_STATUS.SUCCESS:
                        yield fork(handleEmitSearchMainGroup, dataSocket)
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionMainGroup.createMainGroupSuccess(ln.messageModule.EDIT_MAINGROUP_SUCCESS))
                        yield put(actionMainGroup.resetData({}));
                        yield put(actionMainGroup.closeModalAddMainGroup({}));
                        break;
                  case RESULT_STATUS.ERROR:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionMainGroup.createMainGroupFail(ln.messageModule.EDIT_MAINGROUP_FAIL))
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
      const { socket, data, pagination} = params
      const dataSocket ={
            socket,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.deleteMainGroup, data);
            if(res.data.result === RESULT_STATUS.SUCCESS ){
                  yield fork(handleEmitSearchMainGroup, dataSocket)
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
      const { data, pagination } = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            pagination,
            socket
      }
      yield fork(handleCreateMainGroup, payload)
}

function* handleSocketEditMainGroup(action){
      const { data, pagination } = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            pagination,
            socket
      }
      yield fork(handleEditMainGroup, payload)
}

function* handleSocketDeleteMainGroup(action){
      const { data, pagination} = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            pagination,
            socket
      }
      yield fork(handleDeleteMainGroup,  payload)
}

function* handleSearchAndPaginationMainGroup(action){
      try {
         const res = yield call(Service.searchAndPaginationMainGroup, action.payload);
         yield put(actionMainGroup.searchAndPaginationDataSuccess(res.data.data));
      }catch (error) {
         yield put(actionMainGroup.searchAndPaginationDataFailed(ln.messageModule.ERROR_SYSTEM));
      }
}

function* handleFetchListMainGroupBySocket(action){
      const socket = yield call(connect)
      const payload ={
            pagination: action.payload,
            socket
      }
      yield fork(handleEmitSearchMainGroup, payload)
      yield fork(fetchchMainGroupListBySocket, socket)
}

///////////
function* fetchListDataMaingroupBySocket() {
      yield takeEvery(actionMainGroup.searchMainGroupBySocket, handleFetchListMainGroupBySocket);
}
export function* createMainGroup() {
      yield takeEvery(actionMainGroup.createMainGroup, handleSocketCreateMainGroup);
}
function* editMainGroup() {
      yield takeEvery(actionMainGroup.editMainGroup, handleSocketEditMainGroup);
}
function* deleteMainGroup() {
    yield takeEvery(actionMainGroup.deleteMainGroup, handleSocketDeleteMainGroup);
}
function* searchAndPaginationMainGroup() {
    yield takeEvery(actionMainGroup.searchAndPaginationData, handleSearchAndPaginationMainGroup);
}

///////
export function* mainGroupSagaList() {
      yield all([
            fetchListDataMaingroupBySocket(),
            deleteMainGroup(),
            createMainGroup(),
            editMainGroup(),
            searchAndPaginationMainGroup(),
      ]);   
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
      [actionMainGroup.updateDataEdit]: (state, action) => {
            let newState={...state}
            newState.dataEdit = action.payload
            return newState
      },
      [actionMainGroup.searchMainGroupSuccessBySocket]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const { docs, total } = action.payload
            newState.mainGroupList = docs
            newState.totalData = total
            return newState
      },
      [actionMainGroup.searchMainGroupFailBySocket]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionMainGroup.searchAndPaginationDataSuccess]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const {docs, total } = action.payload
            newState.mainGroupList = docs
            newState.totalData = total
            return newState
      },
      [actionMainGroup.searchAndPaginationDataFailed]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
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
      [actionMainGroup.editMainGroupSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionMainGroup.editMainGroupFail]: (state, action) => {
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
            const resetState = {...initialStateClone}
            resetState.pagination = state.pagination
            return resetState
      },
      [actionMainGroup.updatePagination]: (state, action) => {
            let newState={...state}
            const newPagination = {
                  pageCurrent: action.payload.pageCurrent,
                  pageSize: action.payload.pageSize
            }
            newState.pagination = newPagination
            return newState
      },
    },
});
const { reducer } = mainGroupSlice;
export default reducer;