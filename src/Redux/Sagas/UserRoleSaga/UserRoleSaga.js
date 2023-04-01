import { all, call, put, takeEvery, fork} from 'redux-saga/effects';
import * as actionUserRole from '../../Actions/UserRole.action';
import connect from '../../../Services/ConnectSocket/ConnectSocket'
import * as actionLoading from '../../Actions/Loading.action';
import { Service } from '../../../Services/UserRole/UserRole'

function*  handleCreateUserRoleToServer(params){
    const { socket, data, pagination} = params
    console.log("data:",data)
    const dataSocket ={
          socket,
          pagination
    }
    try {
          yield put(actionLoading.loading({}))
          const res = yield call(Service.createUserRole, data);
          const  resultSignal = res.data.result
        //   switch (resultSignal) {
        //         case RESULT_STATUS.SUCCESS:
        //               yield fork(handleEmitSearchMainGroup, dataSocket)
        //               yield put(actionLoading.closeLoading({}))
        //               yield put(actionMainGroup.createMainGroupSuccess(ln.messageModule.CREATE_MAINGROUP_SUCCESS))
        //               yield put(actionMainGroup.resetData({}));
        //               yield put(actionMainGroup.closeModalAddMainGroup({}));
        //               break;
        //         case RESULT_STATUS.ERROR:
        //               yield put(actionLoading.closeLoading({}))
        //               yield put(actionMainGroup.createMainGroupFail(ln.messageModule.CREATE_MAINGROUP_FAIL))
        //               break;
        //         case RESULT_STATUS.DATA_EXIST:
        //               yield put(actionLoading.closeLoading({}))
        //               yield put(actionMainGroup.createMainGroupFail(ln.messageModule.MAINGROUP_CODE_EXIST))
        //               break;
        //         default:
        //               break;
        //   }
         
       } catch (error) {
        //   yield put(actionMainGroup.createMainGroupFail(ln.messageModule.CREATE_MAINGROUP_FAIL))
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
export function* createUserRoleSaga() {
    yield takeEvery(actionUserRole.create, handleSocketCreateUserRole);
}
export function* userRoleSagaList() {
    yield all([
        //   fetchListDataMaingroupBySocket(),
        //   deleteMainGroup(),
          createUserRoleSaga(),
        //   editMainGroup(),
        //   searchAndPaginationMainGroup(),
    ]);   
}
