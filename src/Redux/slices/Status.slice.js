import { call, put, takeEvery, fork, all} from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../Services/MainGroup/MainGroup'
import connect from '../../Services/ConnectSocket/ConnectSocket'
import { MessageCommon } from "../../Common/message";
import * as actionStatus from '../Actions/Status.action';
import { RESULT_STATUS } from "../../Common/Common_Parameter";
import { MethodCommon } from "../../Common/methods";
import * as actionLoading from '../Actions/Loading.action';
import { PAGINATION_DEFAULT } from "../../Common/Common_Parameter";

const ln = MethodCommon.getLanguage()
const initialState = {
     statusList:[],
      isOpenAddStatus:false,
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

function getStatusBySocket(socket){
      return new Promise(resolve => {
            // socket.on('fetchStatus', (maingroup) => { 
            //   resolve(maingroup);
            // });
      })
}

function* fetchchStatusListBySocket(socket){ 
      while (true) { 
            try {
                  const  resultSearch = yield call(getStatusBySocket,socket)
                  yield put(actionStatus.searchStatusSuccessBySocket(resultSearch)); 
            } catch (error) {
                  yield put(actionStatus.searchStatusFailBySocket(ln.messageModule.ERROR_SYSTEM));
                  
            }
      }
}

function handleEmitSearchStatus(data){ 
    //   data.socket.emit("fetchMainGroup", data.pagination )
}

function*  handleCreateStatus(params){
      const { socket, data, pagination} = params
      const dataSocket ={
            socket,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.createStatus, data);
            const  resultSignal = res.data.result
            switch (resultSignal) {
                  case RESULT_STATUS.SUCCESS:
                        yield fork(handleEmitSearchStatus, dataSocket)
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createStatusSuccess(ln.messageModule.CREATE_MAINGROUP_SUCCESS))
                        yield put(actionStatus.resetData({}));
                        yield put(actionStatus.setModalAddStatus(false));
                        break;
                  case RESULT_STATUS.ERROR:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createStatusFail(ln.messageModule.CREATE_MAINGROUP_FAIL))
                        break;
                  case RESULT_STATUS.DATA_EXIST:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createStatusFail(ln.messageModule.MAINGROUP_CODE_EXIST))
                        break;
                  default:
                        break;
            }
           
         } catch (error) {
            yield put(actionStatus.createStatusFail(ln.messageModule.CREATE_MAINGROUP_FAIL))
         }
}
function*  handleEditStatus(params){ //dangcode
      const { socket, data, pagination} = params
      const dataSocket ={
            socket,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.editStatus, data);
            const  resultSignal = res.data.result
            switch (resultSignal) {
                  case RESULT_STATUS.SUCCESS:
                        yield fork(handleEmitSearchStatus, dataSocket)
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createStatusSuccess(ln.messageModule.EDIT_MAINGROUP_SUCCESS))
                        yield put(actionStatus.resetData({}));
                        yield put(actionStatus.setModalAddStatus(false));
                        break;
                  case RESULT_STATUS.ERROR:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createStatusFail(ln.messageModule.EDIT_MAINGROUP_FAIL))
                        break;
                  case RESULT_STATUS.DATA_EXIST:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createStatusFail(ln.messageModule.MAINGROUP_CODE_EXIST))
                        break;
                  default:
                        break;
            }
           
         } catch (error) {
            yield put(actionStatus.createStatusFail(ln.messageModule.CREATE_MAINGROUP_FAIL))
         }
}

function* handleDeleteStatus(params){
      const { socket, data, pagination} = params
      const dataSocket ={
            socket,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.deleteStatus, data);
            if(res.data.result === RESULT_STATUS.SUCCESS ){
                  yield fork(handleEmitSearchStatus, dataSocket)
                  yield put(actionStatus.deleteStatusSuccess(ln.messageModule.DELETE_MAINGROUP_SUCCESS))
                  yield put(actionLoading.closeLoading({}))
                  yield put(actionStatus.closeConfirmDelete())
            }else{
                  yield put(actionStatus.createStatusFail(ln.messageModule.DELETE_MAINGROUP_FAIL))   
            }
            
      } catch (error) {
               
      }
}

function* handleSocketCreateStatus(action){
      const { data, pagination } = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            pagination,
            socket
      }
      yield fork(handleCreateStatus, payload)
}

function* handleSocketEditStatus(action){
      const { data, pagination } = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            pagination,
            socket
      }
      yield fork(handleEditStatus, payload)
}

function* handleSocketDeleteStatus(action){
      const { data, pagination} = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            pagination,
            socket
      }
      yield fork(handleDeleteStatus,  payload)
}

function* handleSearchAndPaginationStatus(action){
      try {
         const res = yield call(Service.searchAndPaginationStatus, action.payload);
         yield put(actionStatus.searchAndPaginationDataSuccess(res.data.data));
      }catch (error) {
         yield put(actionStatus.searchAndPaginationDataFailed(ln.messageModule.ERROR_SYSTEM));
      }
}

function* handleFetchListStatusBySocket(action){
      const socket = yield call(connect)
      const payload ={
            pagination: action.payload,
            socket
      }
      yield fork(handleEmitSearchStatus, payload)
      yield fork(fetchchStatusListBySocket, socket)
}

///////////
function* fetchListDataStatusBySocket() {
      yield takeEvery(actionStatus.searchStatusBySocket, handleFetchListStatusBySocket);
  }
function* createStatus() {
      yield takeEvery(actionStatus.createStatus, handleSocketCreateStatus);
}
function* editStatus() {
      yield takeEvery(actionStatus.editStatus, handleSocketEditStatus);
}
function* deleteStatus() {
    yield takeEvery(actionStatus.deleteStatus, handleSocketDeleteStatus);
}
function* searchAndPaginationStatus() {
      yield takeEvery(actionStatus.searchAndPaginationData, handleSearchAndPaginationStatus);
}
// function* onFetchMainGroupListBySocket() {
//       const socket = yield call(connect)
//       yield fork(handleEmitSearchMainGroup, socket)
//       yield fork(fetchchMainGroupListBySocket, socket)
// }

///////
export function* statusSagaList() {
      yield all([
            // fetchListDataStatusBySocket(),
            // deleteStatus(),
            // createStatus(),
            // editStatus(),
            // searchAndPaginationStatus(),
      ]);   
}

const statusSlice = createSlice({
    name: "status",
    initialState,
    extraReducers: {
      [actionStatus.updateDataInput]: (state, action) => {
            let newState={...state}
            newState.data = action.payload
            return newState
      },
      [actionStatus.updateDataEdit]: (state, action) => {
            let newState={...state}
            newState.dataEdit = action.payload
            return newState
      },
      [actionStatus.searchStatusSuccessBySocket]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const { docs, total } = action.payload
            newState.statusList = docs
            newState.totalData = total
            return newState
      },
      [actionStatus.searchStatusFailBySocket]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionStatus.searchAndPaginationDataSuccess]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const {docs, total } = action.payload
            newState.StatusList = docs
            newState.totalData = total
            return newState
      },
      [actionStatus.searchAndPaginationDataFailed]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
    //   [actionStatus.openModalAddStatus]: (state, action) => {
    //         let newState={...state}
    //         newState.isOpenAddStatus = true
    //         return newState
    //   },
      [actionStatus.setModalAddStatus]: (state, action) => {
            let newState={...state}
            // newState.isOpenAddStatus = false
            return newState
      },
      [actionStatus.deleteStatusSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionStatus.deleteStatusFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionStatus.createStatusSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionStatus.createStatusFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionStatus.editStatusSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionStatus.editStatusFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionStatus.openConfirmDelete]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmDelete = true
            return newState
      },
      [actionStatus.closeConfirmDelete]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmDelete = false
            return newState
      },
      [actionStatus.openConfirmEdit]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmEdit = true
            return newState
      },
      [actionStatus.closeConfirmEdit]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmEdit = false
            return newState
      },
      [actionStatus.resetData]: (state, action) => {
            const resetState = {...initialStateClone}
            resetState.pagination = state.pagination
            return resetState
      },
      [actionStatus.updatePagination]: (state, action) => {
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
  const { reducer } = statusSlice;
  export default reducer;