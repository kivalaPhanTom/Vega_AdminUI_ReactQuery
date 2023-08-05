import { createSlice } from "@reduxjs/toolkit";
import { MessageCommon } from "../../Common/message";
import * as actionUserRole from '../Actions/UserRole.action';
// import { MethodCommon } from "../../Common/methods";
import { PAGINATION_DEFAULT } from "../../Common/Common_Parameter";
import { RESULT_STATUS } from "../../Common/Common_Parameter";
// const ln = MethodCommon.getLanguage()

const initialState = {
      // userRoleList: [],
      isOpenAddUserRole: false,
      isOpenConfirmDelete: false,
      isOpenConfirmEdit: false,
      isOpenModalFiltering: false,
      listCreatedUserFiltering: [],
      listUpdatedUserFiltering: [],
      createdDateFiltering: null,
      updatedDateFiltering: null,
      dataEdit: {
            id: '',
            userRoleCode: '',
            userRoleName: '',
      },
      // totalData: 0,
      // pagination: {
      //       pageCurrent: PAGINATION_DEFAULT.pageCurrent,
      //       pageSize: PAGINATION_DEFAULT.pageSize,
      // }
}
const initialStateClone = JSON.parse(JSON.stringify(initialState))

const userRoleSlice = createSlice({
      name: "userRole",
      initialState,
      reducers: {
            // setListData: (state, action) => {
            //       let newState={...state}
            //       action.payload.docs.forEach((element,index) => {
            //             element.key = element._id
            //       });
            //       const {docs, total } = action.payload
            //       newState.userRoleList = docs
            //       newState.totalData = total
            //       return newState
            // },
            handleAlertAddResultAction: (state, action) => {
                  let newState = { ...state }
                  const { signal, lang } = action.payload
                  switch (signal) {
                        case RESULT_STATUS.SUCCESS:
                              MessageCommon.openNotificationSuccess('Tạo vai trò thành công')
                              break;
                        case RESULT_STATUS.ERROR:
                              MessageCommon.openNotificationError('Tạo vai trò thất bại')
                              break;
                        case RESULT_STATUS.DATA_EXIST:
                              MessageCommon.openNotificationError('Dữ liệu đã tồn tại')
                              break;
                        default:
                              MessageCommon.openNotificationError('Tạo vai trò thất bại')
                              break;
                  }
                  return newState
            },
            setModalAdd:(state, action) => {
                  let newState = { ...state }
                  newState.isOpenAddUserRole = action.payload
                  return newState
            },
            setConfirmDelete: (state, action) => {
                  let newState = { ...state }
                  newState.isOpenConfirmDelete = action.payload
                  return newState
            },
            handleAlertDeleteResultAction: (state, action) => {
                  let newState = { ...state }
                  const { signal, lang } = action.payload
                  switch (signal) {
                        case RESULT_STATUS.SUCCESS:
                              MessageCommon.openNotificationSuccess('Xóa vai trò thành công')
                              break;
                        case RESULT_STATUS.ERROR:
                              MessageCommon.openNotificationError('Xóa vai trò thất bại')
                              break;
                        default:
                              MessageCommon.openNotificationError('Xóa vai trò thất bại')
                              break;
                  }
                  return newState
            },

            setConfirmEdit: (state, action) => {
                  let newState = { ...state }
                  newState.isOpenConfirmEdit = action.payload
                  return newState
            },
            handleAlertEditResultAction: (state, action) => {
                  let newState = { ...state }
                  const { signal, lang } = action.payload
                  switch (signal) {
                        case RESULT_STATUS.SUCCESS:
                              MessageCommon.openNotificationSuccess('sửa vai trò thành công')
                              break;
                        case RESULT_STATUS.ERROR:
                              MessageCommon.openNotificationError('Sửa vai trò thất bại')
                              break;
                        default:
                              MessageCommon.openNotificationError('Sửa vai trò thất bại')
                              break;
                  }
                  return newState
            },
            setModalFiltering: (state, action) => {
                  let newState = { ...state }
                  newState.isOpenModalFiltering = action.payload
                  return newState
            },
            updateDataEdit: (state, action) => {
                  let newState = { ...state }
                  newState.dataEdit = action.payload
                  return newState
            },
            resetData: (state, action) => {
                  const resetState = { ...initialStateClone }
                  resetState.pagination = state.pagination
                  return resetState
            }
      },

      extraReducers: {
            // [actionUserRole.updateDataEdit]: (state, action) => {
            //       let newState = { ...state }
            //       newState.dataEdit = action.payload
            //       return newState
            // },
            // [actionUserRole.searchSuccessBySocket]: (state, action) => {
            //       let newState={...state}
            //       action.payload.docs.forEach((element,index) => {
            //             element.key = element._id
            //       });
            //       const { docs, total } = action.payload
            //       newState.userRoleList = docs
            //       newState.totalData = total
            //       return newState
            // },
            // [actionUserRole.searchFailBySocket]: (state, action) => {
            //       MessageCommon.openNotificationError(action.payload)
            // },
            // [actionUserRole.searchAndPaginationDataSuccess]: (state, action) => {
            //       let newState={...state}
            //       action.payload.docs.forEach((element,index) => {
            //             element.key = element._id
            //       });
            //       const {docs, total } = action.payload
            //       newState.userRoleList = docs
            //       newState.totalData = total
            //       return newState
            // },
            // [actionUserRole.searchAndPaginationDataFailed]: (state, action) => {
            //       MessageCommon.openNotificationError(action.payload)
            // },
            // [actionUserRole.setModalAdd]: (state, action) => {
            //       let newState = { ...state }
            //       newState.isOpenAddUserRole = action.payload
            //       return newState
            // },
            // [actionUserRole.deleteDataSuccess]: (state, action) => {
            //       MessageCommon.openNotificationSuccess(action.payload)
            // },
            // [actionUserRole.deleteDataFail]: (state, action) => {
            //       MessageCommon.openNotificationError(action.payload)
            // },
            // [actionUserRole.createSuccess]: (state, action) => {
            //       MessageCommon.openNotificationSuccess(action.payload)
            // },
            // [actionUserRole.createFail]: (state, action) => {
            //       MessageCommon.openNotificationError(action.payload)
            // },
            // [actionUserRole.editSuccess]: (state, action) => {
            //       MessageCommon.openNotificationSuccess(action.payload)
            // },
            // [actionUserRole.editFail]: (state, action) => {
            //       MessageCommon.openNotificationError(action.payload)
            // },
            // [actionUserRole.setConfirmDelete]: (state, action) => {
            //       let newState = { ...state }
            //       newState.isOpenConfirmDelete = action.payload
            //       return newState
            // },
            // [actionUserRole.setConfirmEdit]: (state, action) => {
            //       let newState = { ...state }
            //       newState.isOpenConfirmEdit = action.payload
            //       return newState
            // },
            // [actionUserRole.resetData]: (state, action) => {
            //       const resetState = { ...initialStateClone }
            //       resetState.pagination = state.pagination
            //       return resetState
            // },
            // [actionUserRole.updatePagination]: (state, action) => {
            //       let newState = { ...state }
            //       const newPagination = {
            //             pageCurrent: action.payload.pageCurrent,
            //             pageSize: action.payload.pageSize
            //       }
            //       newState.pagination = newPagination
            //       return newState
            // },
            // [actionUserRole.setModalFiltering]: (state, action) => {
            //       let newState = { ...state }
            //       newState.isOpenModalFiltering = action.payload
            //       return newState
            // },

            //Fitlering
            [actionUserRole.getCreatedUserFilteringSuccess]: (state, action) => {
                  let newState = { ...state }
                  newState.listCreatedUserFiltering = action.payload
                  return newState
            },

            [actionUserRole.getUpdatedUserFilteringSuccess]: (state, action) => {
                  let newState = { ...state }
                  newState.listUpdatedUserFiltering = action.payload
                  return newState
            },

            [actionUserRole.setCreatedDateFiltering]: (state, action) => {
                  let newState = { ...state }
                  newState.createdDateFiltering = action.payload
                  return newState
            },

            [actionUserRole.setUpdatedFiltering]: (state, action) => {
                  let newState = { ...state }
                  newState.updatedDateFiltering = action.payload
                  return newState
            },

      },
});
const { reducer } = userRoleSlice;
export const { handleAlertAddResultAction, setModalAdd, setConfirmDelete, handleAlertDeleteResultAction, setConfirmEdit , handleAlertEditResultAction, setModalFiltering,
      updateDataEdit, resetData} = userRoleSlice.actions;
export default reducer;