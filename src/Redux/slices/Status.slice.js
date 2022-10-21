import { call, put, takeEvery, fork, all} from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../Services/Status/Status'
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
      },
      dataEdit:{
            id:'',
            code:'',
            name:'',
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
            socket.on('fetchStatus', (status) => { 
              resolve(status);
            });
      })
}

function* fetchchStatusListBySocket(socket){ 
      while (true) { 
            try {
                  const  resultSearch = yield call(getStatusBySocket,socket)
                  yield put(actionStatus.searchSuccessBySocket(resultSearch)); 
            } catch (error) {
                  yield put(actionStatus.searchFailBySocket(ln.messageModule.ERROR_SYSTEM));
                  
            }
      }
}

function handleEmitSearchStatus(data){ 
      data.socket.emit("fetchStatus", data.pagination )
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
                        yield put(actionStatus.createSuccess(ln.messageModule.CREATE_STATUS_SUCCESS))
                        yield put(actionStatus.resetData({}));
                        yield put(actionStatus.setModalAdd(false));
                        break;
                  case RESULT_STATUS.ERROR:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createFail(ln.messageModule.CREATE_STATUS_FAIL))
                        break;
                  case RESULT_STATUS.DATA_EXIST:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createFail(ln.messageModule.STATUS_CODE_EXIST))
                        break;
                  default:
                        break;
            }
           
         } catch (error) {
            yield put(actionStatus.createFail(ln.messageModule.CREATE_STATUS_FAIL))
         }
}
function*  handleEditStatus(params){
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
                        yield put(actionStatus.createSuccess(ln.messageModule.EDIT_STATUS_SUCCESS))
                        yield put(actionStatus.resetData({}));
                        yield put(actionStatus.setModalAdd(false));
                        break;
                  case RESULT_STATUS.ERROR:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createFail(ln.messageModule.EDIT_STATUS_FAIL))
                        break;
                  case RESULT_STATUS.DATA_EXIST:
                        yield put(actionLoading.closeLoading({}))
                        yield put(actionStatus.createFail(ln.messageModule.STATUS_CODE_EXIST))
                        break;
                  default:
                        break;
            }
           
         } catch (error) {
            yield put(actionStatus.createFail(ln.messageModule.CREATE_STATUS_FAIL))
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
                  yield put(actionStatus.deleteDataSuccess(ln.messageModule.DELETE_STATUS_SUCCESS))
                  yield put(actionLoading.closeLoading({}))
                  yield put(actionStatus.closeConfirmDelete())
            }else{
                  yield put(actionStatus.createFail(ln.messageModule.DELETE_STATUS_FAIL))   
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
      yield takeEvery(actionStatus.searchBySocket, handleFetchListStatusBySocket);
  }
function* createStatus() {
      yield takeEvery(actionStatus.create, handleSocketCreateStatus);
}
function* editStatus() {
      yield takeEvery(actionStatus.edit, handleSocketEditStatus);
}
function* deleteStatus() {
    yield takeEvery(actionStatus.deleteData, handleSocketDeleteStatus);
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
            fetchListDataStatusBySocket(),
            deleteStatus(),
            createStatus(),
            editStatus(),
            searchAndPaginationStatus(),
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
      [actionStatus.searchSuccessBySocket]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const { docs, total } = action.payload
            newState.statusList = docs
            newState.totalData = total
            return newState
      },
      [actionStatus.searchFailBySocket]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionStatus.searchAndPaginationDataSuccess]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const {docs, total } = action.payload
            newState.statusList = docs
            newState.totalData = total
            return newState
      },
      [actionStatus.searchAndPaginationDataFailed]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionStatus.setModalAdd]: (state, action) => {
            let newState={...state}
            newState.isOpenAddStatus = action.payload
            return newState
      },
      [actionStatus.deleteDataSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionStatus.deleteDataFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionStatus.createSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionStatus.createFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionStatus.editSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionStatus.editFail]: (state, action) => {
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