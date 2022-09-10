import { call, put, takeEvery, fork, all} from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../Services/MainGroup/MainGroup'
import connect from '../../Services/ConnectSocket/ConnectSocket'
import { MessageCommon } from "../../Common/message";
import * as actionMainGroup from '../Actions/MainGroup.action';
import { RESULT_STATUS } from "../../Common/Common_Parameter";
import { MethodCommon } from "../../Common/methods";
import * as actionLoading from '../Actions/Loading.action';
// import { PAGINATION_DEFAULT } from "../../../../Common/Common_Parameter";
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

function* fetchchMainGroupListBySocket(socket){ //dangcode
      while (true) { 
            try {
                  const  resultSearch = yield call(getMainGroupBySocket,socket)
                  yield put(actionMainGroup.searchMainGroupSuccessBySocket(resultSearch)); 
            } catch (error) {
                  yield put(actionMainGroup.searchMainGroupFailBySocket(ln.messageModule.ERROR_SYSTEM));
                  
            }
            
      }
}
// export function handleEmitSearchMainGroup(socket){
//       socket.emit("fetchMainGroup", {} )
// }

function handleEmitSearchMainGroup(data){ //dangcode
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
function* handleFetchListMainGroupBySocket(action){ //dangcode
      console.log("action.payload:",action.payload)
      // const { data } = action.payload
      const socket = yield call(connect)
      const payload ={
            pagination: action.payload,
            socket
      }
      yield fork(handleEmitSearchMainGroup, payload)
      yield fork(fetchchMainGroupListBySocket, socket)
      // yield fork(handleDeleteMainGroup,  payload)

}

///////////
function* fetchListDataMaingroupBySocket() {
      yield takeEvery(actionMainGroup.searchMainGroupBySocket, handleFetchListMainGroupBySocket);
  }
function* createMainGroup() {
      yield takeEvery(actionMainGroup.createMainGroup, handleSocketCreateMainGroup);
}

function* deleteMainGroup() {
    yield takeEvery(actionMainGroup.deleteMainGroup, handleSocketDeleteMainGroup);
}
function* searchAndPaginationMainGroup() {
      yield takeEvery(actionMainGroup.searchAndPaginationData, handleSearchAndPaginationMainGroup);
}
function* onFetchMainGroupListBySocket() {
      const socket = yield call(connect)
      yield fork(handleEmitSearchMainGroup, socket)
      yield fork(fetchchMainGroupListBySocket, socket)
}

///////
export function* mainGroupSagaList() {
      // yield fork(onFetchMainGroupListBySocket);
      yield all([
            fetchListDataMaingroupBySocket(),
            deleteMainGroup(),
            createMainGroup(),
            searchAndPaginationMainGroup()
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
      [actionMainGroup.searchMainGroupSuccessBySocket]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = index
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
                  element.key = index
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