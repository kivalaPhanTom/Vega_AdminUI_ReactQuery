import { all, call, put, takeEvery, fork} from 'redux-saga/effects';
import * as actionUserRole from '../../Actions/UserRole.action';
import connect from '../../../Services/ConnectSocket/ConnectSocket'
import * as actionLoading from '../../Actions/Loading.action';
import { Service } from '../../../Services/UserRole/UserRole'
import { MethodCommon } from "../../../Common/methods";
import { RESULT_STATUS } from "../../../Common/Common_Parameter";
const ln = MethodCommon.getLanguage()

function*  handleCreateUserRoleToServer(params){
    const { socket, data, pagination} = params
    const dataSocket ={
          socket,
          pagination
    }
    try {
          yield put(actionLoading.loading({}))
          const res = yield call(Service.createUserRole, data);
          const  resultSignal = res.data.result
          switch (resultSignal) {
                case RESULT_STATUS.SUCCESS:
                      yield fork(handleEmitSearchUserRole, dataSocket)
                      yield put(actionLoading.closeLoading({}))
                      yield put(actionUserRole.createSuccess('Tạo vai trò thành công'))
                      yield put(actionUserRole.setModalAdd(false));
                      break;
                case RESULT_STATUS.ERROR:
                      yield put(actionLoading.closeLoading({}))
                      yield put(actionUserRole.createFail('Tạo vai trò thất bại'))
                      break;
                case RESULT_STATUS.DATA_EXIST:
                      yield put(actionLoading.closeLoading({}))
                      yield put(actionUserRole.createFail('Tạo vai trò thất bại'))
                      break;
                default:
                      break;
          }
         
       } catch (error) {
          yield put(actionUserRole.createFail('Tạo vai trò thất bại'))
       }
}

function* handleSocketCreateUserRole(action){
    const { data, pagination } = action.payload
    const socket = yield call(connect)
    const payload = {
          data, 
          pagination,
          socket
    }
    yield fork(handleCreateUserRoleToServer, payload)
}
function handleEmitSearchUserRole(data){ 
    data.socket.emit("fetchUserRole", data.pagination )
}
function getStatusBySocket(socket){
    return new Promise(resolve => {
        socket.on('fetchUserRole', (status) => { 
            resolve(status);
        });
    })
}
function* fetchchUserRoleListBySocket(socket){ 
    while (true) { 
        try {
            const  resultSearch = yield call(getStatusBySocket,socket)
            yield put(actionUserRole.searchSuccessBySocket(resultSearch)); 
        } catch (error) {
            yield put(actionUserRole.searchFailBySocket(ln.messageModule.ERROR_SYSTEM));     
        }
    }
}
function* handleFetchListUserRoleBySocket(action){
    const socket = yield call(connect)
    const payload ={
          pagination: action.payload,
          socket
    }
    yield fork(handleEmitSearchUserRole, payload)
    yield fork(fetchchUserRoleListBySocket, socket)
}


export function* createUserRoleSaga() {
    yield takeEvery(actionUserRole.create, handleSocketCreateUserRole);
}
function* fetchListDataUserRoleBySocket() {
    yield takeEvery(actionUserRole.searchBySocket, handleFetchListUserRoleBySocket);
}
function* handleDeleteUserRole(params){
    const {socket, data, pagination} = params
    const dataSocket ={
        socket,
        pagination
    }
    try {
          yield put(actionLoading.loading({}))
          const res = yield call(Service.deleteUserRole, data);
          if(res.data.result === RESULT_STATUS.SUCCESS ){
                yield fork(handleEmitSearchUserRole, dataSocket)
                yield put(actionUserRole.deleteDataSuccess('Xóa vai trò thành công'))
                yield put(actionLoading.closeLoading({}))
                yield put(actionUserRole.setConfirmDelete(false))
          }else{
                yield put(actionUserRole.deleteDataFail('Xóa vai trò thất bạn'))   
          }
          
    } catch (error) {
             
    }
}
function* handleSocketDeleteUserRole(action){
    const { data, pagination} = action.payload
    const socket = yield call(connect)
    const payload ={
          data,
          pagination,
          socket
    }
    yield fork(handleDeleteUserRole,  payload)
}
function* deleteUserRoleSaga() {
    yield takeEvery(actionUserRole.deleteData, handleSocketDeleteUserRole);
}

function*  handleEditUserRoleToServer(params){
    const { socket, data, pagination} = params
    const dataSocket ={
          socket,
          pagination
    }
    try {
          yield put(actionLoading.loading({}))
          const res = yield call(Service.editUserRole, data);
          const  resultSignal = res.data.result
          switch (resultSignal) {
                case RESULT_STATUS.SUCCESS:
                      yield fork(handleEmitSearchUserRole, dataSocket)
                      yield put(actionLoading.closeLoading({}))
                      yield put(actionUserRole.editSuccess('Cập nhật vai trò thành công'))
                      yield put(actionUserRole.resetData({}));
                      yield put(actionUserRole.setConfirmEdit(false));
                      break;
                case RESULT_STATUS.ERROR:
                      yield put(actionLoading.closeLoading({}))
                      yield put(actionUserRole.editFail('Cập nhật vai trò thất bại'))
                      break;
                case RESULT_STATUS.DATA_EXIST:
                      yield put(actionLoading.closeLoading({}))
                      yield put(actionUserRole.editFail('Dữ liệu đã tồn tại'))
                      break;
                default:
                      break;
          }
         
       } catch (error) {
          yield put(actionUserRole.editFail('Cập nhật vai trò thất bại'))
       }
}

function* handleSocketEditUserRole(action){
    const { data, pagination } = action.payload
    const socket = yield call(connect)
    const payload ={
          data,
          pagination,
          socket
    }
    yield fork(handleEditUserRoleToServer, payload)
}
function* editUserRoleSaga() {
    yield takeEvery(actionUserRole.edit, handleSocketEditUserRole);
}

function* handleSearchAndPaginationUserRoleToServer(action){
    try {
       const res = yield call(Service.searchAndPaginationUserRole, action.payload);
       yield put(actionUserRole.searchAndPaginationDataSuccess(res.data.data));
    }catch (error) {
       yield put(actionUserRole.searchAndPaginationDataFailed(ln.messageModule.ERROR_SYSTEM));
    }
}

function* searchAndPaginationUserRoleSaga() {
    yield takeEvery(actionUserRole.searchAndPaginationData, handleSearchAndPaginationUserRoleToServer);
}
export function* userRoleSagaList() {
    yield all([
        fetchListDataUserRoleBySocket(),
        deleteUserRoleSaga(),
        createUserRoleSaga(),
        editUserRoleSaga(),
        searchAndPaginationUserRoleSaga(),
    ]);   
}
