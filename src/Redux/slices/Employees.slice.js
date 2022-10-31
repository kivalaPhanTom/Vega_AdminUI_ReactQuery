import { call, put, takeEvery, fork, all} from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../Services/Status/Status'
import connect from '../../Services/ConnectSocket/ConnectSocket'
import { MessageCommon } from "../../Common/message";
import * as employeesStatus from '../Actions/Employees';
import { RESULT_STATUS } from "../../Common/Common_Parameter";
import { MethodCommon } from "../../Common/methods";
import * as actionLoading from '../Actions/Loading.action';
import { PAGINATION_DEFAULT } from "../../Common/Common_Parameter";

const ln = MethodCommon.getLanguage()
const initialState = {
      employeesList:[],
      isOpenAdd:false,
      isOpenConfirmDelete:false,
      isOpenConfirmEdit:false,
      data:{
        employeeID:null,
        user_name:'',
        Role:0,
        birthDate:null,
        address:'',
        CMND:'',
        phone:'',
        workingAddress:'',
        user_password:'',
        user_email:'',
        keysearch:"",
        Avatar:null,
        status:null,
        workingDay:null,
        stopWorkingDay:null,
      },
      dataEdit:{
            id:'',
            employeeID:null,
            user_name:'',
            Role:0,
            birthDate:null,
            address:'',
            CMND:'',
            phone:'',
            workingAddress:'',
            user_password:'',
            user_email:'',
            keysearch:"",
            Avatar:null,
            status:null,
            workingDay:null,
            stopWorkingDay:null,
      },
      totalData:0,
      pagination:{
            pageCurrent: PAGINATION_DEFAULT.pageCurrent,
            pageSize: PAGINATION_DEFAULT.pageSize,
      }
}
const initialStateClone = JSON.parse(JSON.stringify(initialState))

function getBySocket(socket){
      return new Promise(resolve => {
            socket.on('fetchStatus', (status) => { 
              resolve(status);
            });
      })
}

function* fetchchListBySocket(socket){ 
      while (true) { 
            try {
                  const  resultSearch = yield call(getBySocket,socket)
                  yield put(employeesStatus.searchSuccessBySocket(resultSearch)); 
            } catch (error) {
                  yield put(employeesStatus.searchFailBySocket(ln.messageModule.ERROR_SYSTEM));
                  
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
                        yield put(employeesStatus.createSuccess(ln.messageModule.CREATE_STATUS_SUCCESS))
                        yield put(employeesStatus.resetData({}));
                        yield put(employeesStatus.setModalAdd(false));
                        break;
                  case RESULT_STATUS.ERROR:
                        yield put(actionLoading.closeLoading({}))
                        yield put(employeesStatus.createFail(ln.messageModule.CREATE_STATUS_FAIL))
                        break;
                  case RESULT_STATUS.DATA_EXIST:
                        yield put(actionLoading.closeLoading({}))
                        yield put(employeesStatus.createFail(ln.messageModule.STATUS_CODE_EXIST))
                        break;
                  default:
                        break;
            }
           
         } catch (error) {
            yield put(employeesStatus.createFail(ln.messageModule.CREATE_STATUS_FAIL))
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
                        yield put(employeesStatus.createSuccess(ln.messageModule.EDIT_STATUS_SUCCESS))
                        yield put(employeesStatus.resetData({}));
                        yield put(employeesStatus.setModalAdd(false));
                        break;
                  case RESULT_STATUS.ERROR:
                        yield put(actionLoading.closeLoading({}))
                        yield put(employeesStatus.createFail(ln.messageModule.EDIT_STATUS_FAIL))
                        break;
                  case RESULT_STATUS.DATA_EXIST:
                        yield put(actionLoading.closeLoading({}))
                        yield put(employeesStatus.createFail(ln.messageModule.STATUS_CODE_EXIST))
                        break;
                  default:
                        break;
            }
           
         } catch (error) {
            yield put(employeesStatus.createFail(ln.messageModule.CREATE_STATUS_FAIL))
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
                  yield put(employeesStatus.deleteDataSuccess(ln.messageModule.DELETE_STATUS_SUCCESS))
                  yield put(actionLoading.closeLoading({}))
                  yield put(employeesStatus.closeConfirmDelete())
            }else{
                  yield put(employeesStatus.createFail(ln.messageModule.DELETE_STATUS_FAIL))   
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
         yield put(employeesStatus.searchAndPaginationDataSuccess(res.data.data));
      }catch (error) {
         yield put(employeesStatus.searchAndPaginationDataFailed(ln.messageModule.ERROR_SYSTEM));
      }
}

function* handleFetchListStatusBySocket(action){
      const socket = yield call(connect)
      const payload ={
            pagination: action.payload,
            socket
      }
      yield fork(handleEmitSearchStatus, payload)
      yield fork(fetchchListBySocket, socket)
}

///////////
function* fetchListDataBySocket() {
      yield takeEvery(employeesStatus.searchBySocket, handleFetchListStatusBySocket);
  }
function* createStatus() {
      yield takeEvery(employeesStatus.create, handleSocketCreateStatus);
}
function* editStatus() {
      yield takeEvery(employeesStatus.edit, handleSocketEditStatus);
}
function* deleteStatus() {
    yield takeEvery(employeesStatus.deleteData, handleSocketDeleteStatus);
}
function* searchAndPaginationStatus() {
      yield takeEvery(employeesStatus.searchAndPaginationData, handleSearchAndPaginationStatus);
}
// function* onFetchMainGroupListBySocket() {
//       const socket = yield call(connect)
//       yield fork(handleEmitSearchMainGroup, socket)
//       yield fork(fetchchMainGroupListBySocket, socket)
// }

///////
export function* employeesSagaList() {
      yield all([
            fetchListDataBySocket(),
            deleteStatus(),
            createStatus(),
            editStatus(),
            searchAndPaginationStatus(),
      ]);   
}

const employeesSlice = createSlice({
    name: "status",
    initialState,
    extraReducers: {
      [employeesStatus.updateDataInput]: (state, action) => {
            let newState={...state}
            newState.data = action.payload
            return newState
      },
      [employeesStatus.updateDataEdit]: (state, action) => {
            let newState={...state}
            newState.dataEdit = action.payload
            return newState
      },
      [employeesStatus.searchSuccessBySocket]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const { docs, total } = action.payload
            newState.employeesList = docs
            newState.totalData = total
            return newState
      },
      [employeesStatus.searchFailBySocket]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [employeesStatus.searchAndPaginationDataSuccess]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const {docs, total } = action.payload
            newState.employeesList = docs
            newState.totalData = total
            return newState
      },
      [employeesStatus.searchAndPaginationDataFailed]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [employeesStatus.setModalAdd]: (state, action) => {
            let newState={...state}
            newState.isOpenAdd = action.payload
            return newState
      },
      [employeesStatus.deleteDataSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [employeesStatus.deleteDataFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [employeesStatus.createSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [employeesStatus.createFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [employeesStatus.editSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [employeesStatus.editFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [employeesStatus.openConfirmDelete]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmDelete = true
            return newState
      },
      [employeesStatus.closeConfirmDelete]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmDelete = false
            return newState
      },
      [employeesStatus.openConfirmEdit]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmEdit = true
            return newState
      },
      [employeesStatus.closeConfirmEdit]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmEdit = false
            return newState
      },
      [employeesStatus.resetData]: (state, action) => {
            const resetState = {...initialStateClone}
            resetState.pagination = state.pagination
            return resetState
      },
      [employeesStatus.updatePagination]: (state, action) => {
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
  const { reducer } = employeesSlice;
  export default reducer;