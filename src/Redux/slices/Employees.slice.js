import { call, put, takeEvery, fork, all} from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../Services/Employees/Employees'
import connect from '../../Services/ConnectSocket/ConnectSocket'
import { MessageCommon } from "../../Common/message";
import * as actionEmployees from '../Actions/Employees';
import { RESULT_STATUS } from "../../Common/Common_Parameter";
import { MethodCommon } from "../../Common/methods";
import * as actionLoading from '../Actions/Loading.action';
import { PAGINATION_DEFAULT } from "../../Common/Common_Parameter";
import {sha1} from 'crypto-hash';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../../config';

const ln = MethodCommon.getLanguage()
const initialState = {
      employeesList:[],
      isOpenAdd:false,
      isOpenConfirmDelete:false,
      isOpenConfirmEdit:false,
      data:{
        employeeID:'',
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
            employeeID:'',
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
      cacheDataEdit:{
            id:'',
            employeeID:'',
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

function getBySocket(socket){
      return new Promise(resolve => {
            socket.on('fetchEmployee', (employees) => { 
              resolve(employees);
            });
      })
}

function* fetchchListBySocket(socket){ 
      while (true) { 
            try {
                  const  resultSearch = yield call(getBySocket,socket)
                  yield put(actionEmployees.searchSuccessBySocket(resultSearch)); 
            } catch (error) {
                  yield put(actionEmployees.searchFailBySocket(ln.messageModule.ERROR_SYSTEM));
                  
            }
      }
}

function handleEmitSearchEmployee(data){ 
      data.socket.emit("fetchEmployee", data.pagination )
}

function*  handleCreateStatus(params){
      const { socket, pagination} = params
      let { data } = params
      const dataSocket ={
            socket,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            const formData = new FormData();
            formData.append('file', data.fileList[0].originFileObj);
            formData.append('upload_preset', 'vegaImage');
            try {
                  const resImg = yield call(Service.uploadImage, formData);
                  data.Avatar = {
                        uid: data.fileList[0].uid,
                        name: data.fileList[0].name,
                        status: data.fileList[0].status,
                        url: resImg.data.secure_url,
                        publicID: resImg.data.public_id
                  }
                  delete  data.fileList; 
                  try { //bắt lỗi nếu lỗi khi lưu data xuống server
                        const res = yield call(Service.createEmployee, data);
                        const  resultSignal = res.data.result
                        switch (resultSignal) {
                              case RESULT_STATUS.SUCCESS:
                                    yield fork(handleEmitSearchEmployee, dataSocket)
                                    yield put(actionLoading.closeLoading({}))
                                    yield put(actionEmployees.createSuccess(ln.messageModule.CREATE_EMPLOYEE_SUCCESS))
                                    yield put(actionEmployees.resetData({}));
                                    yield put(actionEmployees.setModalAdd(false));
                                    break;
                              case RESULT_STATUS.ERROR:
                                    yield put(actionLoading.closeLoading({}))
                                    yield put(actionEmployees.createFail(ln.messageModule.CREATE_EMPLOYEE_FAIL))
                                    break;
                              case RESULT_STATUS.DATA_EXIST: 
                                    // -- xóa ảnh cũ trên cloudinary --
                                    const timestamp = new Date().getTime()
                                    const formData1 = new FormData();
                                    const publicID = resImg.data.public_id
                                    const string = `public_id=${publicID}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
                                    function hashStringBySha1(data){
                                          return sha1(string)
                                    }
                                    const signature = yield call(hashStringBySha1,'');
                                    formData1.append("public_id", publicID)
                                    formData1.append("signature", signature)
                                    formData1.append("api_key", CLOUDINARY_API_KEY)
                                    formData1.append("timestamp",timestamp)
                                    try {
                                        yield call(Service.deleteImage, formData1);  
                                    } catch (error) {
                                        console.log("error:",error)
                                    }
                                    // -- xóa ảnh cũ trên cloudinary --
      
                                    yield put(actionLoading.closeLoading({}))
                                    yield put(actionEmployees.createFail(ln.messageModule.EMPLOYEE_CODE_EXIST))
                                    break;
                              default:
                                    break;
                        }
                  } catch (error) {
                        // -- xóa ảnh cũ trên cloudinary --
                        const timestamp = new Date().getTime()
                        const formData1 = new FormData();
                        const publicID = resImg.data.public_id
                        const string = `public_id=${publicID}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
                        function hashStringBySha1(data){
                              return sha1(string)
                        }
                        const signature = yield call(hashStringBySha1,'');
                        formData1.append("public_id", publicID)
                        formData1.append("signature", signature)
                        formData1.append("api_key", CLOUDINARY_API_KEY)
                        formData1.append("timestamp",timestamp)
                        try {
                             yield call(Service.deleteImage, formData1);  
                        } catch (error) {
                             console.log("error:",error)
                        }
                        // -- xóa ảnh cũ trên cloudinary --
                        yield put(actionEmployees.createFail(ln.messageModule.CREATE_EMPLOYEE_FAIL))
                  }
            } catch (error) {
                  MessageCommon.openNotificationError('Có lỗi xảy ra trong quá trình tải ảnh lên server. Vui lòng thử lại!')
            }           
      } catch (error) {
            yield put(actionEmployees.createFail(ln.messageModule.CREATE_EMPLOYEE_FAIL))
      }
}


      
function*  handleEditEmployee(params){
      const { socket, data, cacheDataEdit,  pagination} = params
      const dataSocket ={
            socket,
            cacheDataEdit,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            if(cacheDataEdit.Avatar.uid !== data.fileList[0].uid){ //nếu ảnh có thay đổi
                  const formData = new FormData();
                  formData.append('file', data.fileList[0].originFileObj);
                  formData.append('upload_preset', 'vegaImage');
                  try {
                        const resImg = yield call(Service.uploadImage, formData);
                        data.Avatar = {
                              uid: data.fileList[0].uid,
                              name: data.fileList[0].name,
                              status: data.fileList[0].status,
                              url: resImg.data.secure_url,
                              publicID: resImg.data.public_id
                        }
                        delete  data.fileList;

                        // -- xóa ảnh cũ trên cloudinary --
                        const timestamp = new Date().getTime()
                        const formData1 = new FormData();
                        const publicID =cacheDataEdit.Avatar.publicID
                        const string = `public_id=${publicID}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
                        function hashStringBySha1(data){
                              return sha1(string)
                        }
                        const signature = yield call(hashStringBySha1,'');
                        formData1.append("public_id", publicID)
                        formData1.append("signature", signature)
                        formData1.append("api_key", CLOUDINARY_API_KEY)
                        formData1.append("timestamp",timestamp)
                        try {
                            yield call(Service.deleteImage, formData1);  
                        } catch (error) {
                            console.log("error:",error)
                        } 
                        // -- xóa ảnh cũ trên cloudinary --

                        // -- lưu dữ liệu thay đổi xuống server --
                        const res = yield call(Service.editEmployee, data);
                        const  resultSignal = res.data.result
                        switch (resultSignal) {
                              case RESULT_STATUS.SUCCESS:
                                    yield fork(handleEmitSearchEmployee, dataSocket)
                                    yield put(actionLoading.closeLoading({}))
                                    yield put(actionEmployees.editSuccess(ln.messageModule.EDIT_EMPLOYEE_SUCCESS))
                                    // yield put(actionEmployees.resetData({}));
                                    yield put(actionEmployees.setModalEdit(false));
                                    break;
                              case RESULT_STATUS.ERROR:
                                    yield put(actionLoading.closeLoading({}))
                                    yield put(actionEmployees.editFail(ln.messageModule.EDIT_EMPLOYEE_FAIL))
                                    break;
                              
                              default:
                                    break;
                        }
                        // -- lưu dữ liệu thay đổi xuống server --

                        } catch (error) {
                              MessageCommon.openNotificationError('Có lỗi xảy ra trong quá trình tải ảnh lên server. Vui lòng thử lại!')
                        } 
            }else{//nếu ảnh ko có thay đổi
                  const res = yield call(Service.editEmployee, data);
                  const  resultSignal = res.data.result
                  switch (resultSignal) {
                        case RESULT_STATUS.SUCCESS:
                              yield fork(handleEmitSearchEmployee, dataSocket)
                              yield put(actionLoading.closeLoading({}))
                              yield put(actionEmployees.editSuccess(ln.messageModule.EDIT_EMPLOYEE_SUCCESS))
                              // yield put(actionEmployees.resetData({}));
                              yield put(actionEmployees.setModalEdit(false));
                              break;
                        case RESULT_STATUS.ERROR:
                              yield put(actionLoading.closeLoading({}))
                              yield put(actionEmployees.editFail(ln.messageModule.EDIT_EMPLOYEE_FAIL))
                              break;
                        
                        default:
                              break;
                  }
            }
      } catch (error) {
            yield put(actionEmployees.createFail(ln.messageModule.CREATE_EMPLOYEE_FAIL))
      }
}

function* handleDeleteEmployee(params){
      const { socket, data, dataImg, pagination } = params
      const dataSocket = {
            socket,
            pagination
      }
      try {
            yield put(actionLoading.loading({}))
            const res = yield call(Service.deleteEmployee, data);
            if(res.data.result === RESULT_STATUS.SUCCESS ){
                  // -- xóa ảnh cũ trên cloudinary --
                  for(let i = 0; i < dataImg.length; i++){
                        const timestamp = new Date().getTime()
                        const formData1 = new FormData();
                        const publicID = dataImg[i]
                        const string = `public_id=${publicID}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
                        function hashStringBySha1(data){
                              return sha1(string)
                        }
                        const signature = yield call(hashStringBySha1,'');
                        formData1.append("public_id", publicID)
                        formData1.append("signature", signature)
                        formData1.append("api_key", CLOUDINARY_API_KEY)
                        formData1.append("timestamp",timestamp)
                        try {
                              yield call(Service.deleteImage, formData1);  
                        } catch (error) {
                              console.log("error:",error)
                        } 
                  }
                  // -- xóa ảnh cũ trên cloudinary --
                  yield fork(handleEmitSearchEmployee, dataSocket)
                  yield put(actionEmployees.deleteDataSuccess(ln.messageModule.DELETE_EMPLOYEE_SUCCESS))
                  yield put(actionLoading.closeLoading({}))
                  yield put(actionEmployees.setModalDelete(false))
            }else{
                  yield put(actionLoading.closeLoading({}))
                  yield put(actionEmployees.createFail(ln.messageModule.DELETE_EMPLOYEE_FAIL))   
            }
            
      } catch (error) {
            yield put(actionEmployees.createFail(ln.messageModule.DELETE_EMPLOYEE_FAIL))   
      }
}

function* handleSocketCreateEmployee(action){
      const { data, pagination } = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            pagination,
            socket
      }
      yield fork(handleCreateStatus, payload)
}

function* handleSocketEditEmployee(action){
      const { data, pagination, cacheDataEdit } = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            cacheDataEdit,
            pagination,
            socket
      }
      yield fork(handleEditEmployee, payload)
}

function* handleSocketDeleteEmployee(action){
      const { data, dataImg, pagination} = action.payload
      const socket = yield call(connect)
      const payload ={
            data,
            dataImg,
            pagination,
            socket
      }
      yield fork(handleDeleteEmployee,  payload)
}

function* handleSearchAndPagination(action){
      try {
         const res = yield call(Service.searchAndPagination, action.payload);
         yield put(actionEmployees.searchAndPaginationDataSuccess(res.data.data));
      }catch (error) {
         yield put(actionEmployees.searchAndPaginationDataFailed(ln.messageModule.ERROR_SYSTEM));
      }
}

function* handleFetchListEmployeeBySocket(action){
      const socket = yield call(connect)
      const payload ={
            pagination: action.payload,
            socket
      }
      yield fork(handleEmitSearchEmployee, payload)
      yield fork(fetchchListBySocket, socket)
}

///////////
function* fetchListDataBySocket() {
      yield takeEvery(actionEmployees.searchBySocket, handleFetchListEmployeeBySocket);
  }
function* createEmployee() {
      yield takeEvery(actionEmployees.create, handleSocketCreateEmployee);
}
function* editEmployee() {
      yield takeEvery(actionEmployees.edit, handleSocketEditEmployee);
}
function* deleteEmployee() {
    yield takeEvery(actionEmployees.deleteData, handleSocketDeleteEmployee);
}
function* searchAndPagination() {
      yield takeEvery(actionEmployees.searchAndPaginationData, handleSearchAndPagination);
}
///////

export function* employeesSagaList() {
      yield all([
            fetchListDataBySocket(),
            deleteEmployee(),
            createEmployee(),
            editEmployee(),
            searchAndPagination(),
      ]);   
}

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    extraReducers: {
      [actionEmployees.updateDataInput]: (state, action) => {
            let newState={...state}
            newState.data = action.payload
            return newState
      },
      [actionEmployees.updateDataEdit]: (state, action) => {
            let newState={...state}
            newState.dataEdit = action.payload
            return newState
      },
      [actionEmployees.cacheDataEdit]: (state, action) => {
            let newState={...state}
            newState.cacheDataEdit = action.payload
            return newState
      },
      [actionEmployees.searchSuccessBySocket]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const { docs, total } = action.payload
            newState.employeesList = docs
            newState.totalData = total
            return newState
      },
      [actionEmployees.searchFailBySocket]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionEmployees.searchAndPaginationDataSuccess]: (state, action) => {
            let newState={...state}
            action.payload.docs.forEach((element,index) => {
                  element.key = element._id
            });
            const {docs, total } = action.payload
            newState.employeesList = docs
            newState.totalData = total
            return newState
      },
      [actionEmployees.searchAndPaginationDataFailed]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionEmployees.setModalAdd]: (state, action) => {
            let newState={...state}
            newState.isOpenAdd = action.payload
            return newState
      },
      [actionEmployees.setModalDelete]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmDelete = action.payload
            return newState
      },
      [actionEmployees.setModalEdit]: (state, action) => {
            let newState={...state}
            newState.isOpenConfirmEdit = action.payload
            return newState
      },
      [actionEmployees.deleteDataSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionEmployees.deleteDataFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionEmployees.createSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionEmployees.createFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionEmployees.editSuccess]: (state, action) => {
            MessageCommon.openNotificationSuccess(action.payload)
      },
      [actionEmployees.editFail]: (state, action) => {
            MessageCommon.openNotificationError(action.payload)
      },
      [actionEmployees.resetData]: (state, action) => {
            const resetState = {...state}
            resetState.data = {
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
            }
            resetState.pagination = state.pagination
            return resetState
      },
      [actionEmployees.updatePagination]: (state, action) => {
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