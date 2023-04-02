// import { call, put, takeEvery, fork, all} from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
// import { Service } from '../../Services/MainGroup/MainGroup'
// import connect from '../../Services/ConnectSocket/ConnectSocket'
import { MessageCommon } from "../../Common/message";
import * as actionUserRole from '../Actions/UserRole.action';
// import { RESULT_STATUS } from "../../Common/Common_Parameter";
// import { MethodCommon } from "../../Common/methods";
// import * as actionLoading from '../Actions/Loading.action';
import { PAGINATION_DEFAULT } from "../../Common/Common_Parameter";
// const ln = MethodCommon.getLanguage()

const initialState = {
      userRoleList:[],
      isOpenAddUserRole:false,
      isOpenConfirmDelete:false,
      isOpenConfirmEdit:false,
  
    //   data:{
    //     userRoleCode:'',
    //         name:'',
    //         isActive:false,
    //         note:''
    //   },
      dataEdit:{
            id:'',
            userRoleCode:'',
            userRoleName:'',
      },
      totalData:0,
      pagination:{
            pageCurrent: PAGINATION_DEFAULT.pageCurrent,
            pageSize: PAGINATION_DEFAULT.pageSize,
      }
}
const initialStateClone = JSON.parse(JSON.stringify(initialState))

const userRoleSlice = createSlice({
    name: "userRole",
    initialState,
    extraReducers: {
    //   [actionMainGroup.updateDataInput]: (state, action) => {
    //         let newState={...state}
    //         newState.data = action.payload
    //         return newState
    //   },
      [actionUserRole.updateDataEdit]: (state, action) => {
            let newState={...state}
            newState.dataEdit = action.payload
            return newState
      },
      [actionUserRole.searchSuccessBySocket]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const { docs, total } = action.payload
            newState.userRoleList = docs
            newState.totalData = total
            return newState
      },
      [actionUserRole.searchFailBySocket]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
    //   [actionMainGroup.searchAndPaginationDataSuccess]: (state, action) => {
    //         let newState={...state}
    //         action.payload.docs.forEach((element,index) => {
    //               element.key = element._id
    //         });
    //         const {docs, total } = action.payload
    //         newState.mainGroupList = docs
    //         newState.totalData = total
    //         return newState
    //   },
    //   [actionMainGroup.searchAndPaginationDataFailed]: (state, action) => {
    //         MessageCommon.openNotificationError(action.payload)
    //   },
      [actionUserRole.setModalAdd]: (state, action) => {
            let newState={...state}
            newState.isOpenAddUserRole = action.payload
            return newState
      },
      [actionUserRole.deleteDataSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionUserRole.deleteDataFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionUserRole.createSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionUserRole.createFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionUserRole.editSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionUserRole.editFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionUserRole.setConfirmDelete]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmDelete = action.payload
            return newState
      },
    //   [actionMainGroup.closeConfirmDelete]: (state, action) => {
    //         let newState={...state}
    //         newState.isOpenConfirmDelete = false
    //         return newState
    //   },
      [actionUserRole.setConfirmEdit]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmEdit = action.payload
            return newState
      },
    //   [actionMainGroup.closeConfirmEdit]: (state, action) => {
    //         let newState={...state}
    //         newState.isOpenConfirmEdit = false
    //         return newState
    //   },
      [actionUserRole.resetData]: (state, action) => {
            const resetState = {...initialStateClone}
            resetState.pagination = state.pagination
            return resetState
      },
    //   [actionMainGroup.updatePagination]: (state, action) => {
    //         let newState={...state}
    //         const newPagination = {
    //               pageCurrent: action.payload.pageCurrent,
    //               pageSize: action.payload.pageSize
    //         }
    //         newState.pagination = newPagination
    //         return newState
    //   },
    },
});
const { reducer } = userRoleSlice;
export default reducer;