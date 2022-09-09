import { call, put, takeLatest, takeEvery,delay } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
// import { Service } from '../../components/Login/Services/Services';
import { Service } from '../../Services/Login/Login';
import { MessageCommon } from "../../Common/message";
import { MethodCommon } from "../../Common/methods";
import { RESULT_STATUS, METHOD_LOGIN} from "../../Common/Common_Parameter";
import * as actionLogin from '../Actions/Login.action';
import * as actionLoading from '../Actions/Loading.action';
import { API_URL } from '../../config';

const ln = MethodCommon.getLanguage()
const initialState = {}
function* handleLoginFaceBook(action) {
    try {
        yield put(actionLoading.loading({}))
        MethodCommon.saveLocalStorage("TypeLoginVega", METHOD_LOGIN.SOCIAL)
        window.open(`${API_URL}/user/login_fb`, "_self");
      } catch (error) {
    }
}
function* handleLoginGoogle(action) {
    try {
      yield put(actionLoading.loading({}))
      MethodCommon.saveLocalStorage("TypeLoginVega", METHOD_LOGIN.SOCIAL)
      window.open(`${API_URL}/user/login_gg`, "_self");
    } catch (error) {
    }
}

function* handleLoginTrandition(action){
  MethodCommon.saveLocalStorage("TypeLoginVega", METHOD_LOGIN.TRANDITIONAL)
  try {
    yield put(actionLoading.loading({}))
    const res = yield call(Service.loginTrandition, action.payload);
    const status = res.data
    switch (status.result) {

        case RESULT_STATUS.SUCCESS:
            yield put(actionLoading.closeLoading({}))
            console.log("status.data:",status.data)
            MethodCommon.saveLocalStorage("UserVega",status.data)
            yield put(actionLogin.loginTranditionSuccess(ln.messageModule.LOGIN_SUCCESS));
            break;

        case RESULT_STATUS.ACCOUNT_NOT_FOUND:
            yield put(actionLoading.closeLoading({}))
            yield put(actionLogin.loginTranditionFail(ln.messageModule.ACCOUNT_NOT_FOUND));
            break;

        case RESULT_STATUS.PASSWORD_ERROR:
            yield put(actionLoading.closeLoading({}))
            yield put(actionLogin.loginTranditionFail(ln.messageModule.ERROR_PASSWORD));
            break;

        default:
              yield put(actionLoading.closeLoading({}))
              yield put(actionLogin.loginTranditionFail(ln.messageModule.ERROR_SYSTEM));
              break;
          }
  } catch (error) {
    yield put(actionLogin.loginTranditionFail(ln.messageModule.ERROR_SYSTEM));
  }
  
}
// function* handleCreateVocabulary(action) {
//     try {
//         const data = yield call(Service.createVocabulary, action.payload.data);
//         yield put(actionVocabulary.addVocabularySucsess("Thêm  từ vựng thành công"));
//         yield put(actionVocabulary.getVocabulary(action.payload.pagination_and_search))
//       } catch (error) {
//         yield put(actionVocabulary.addVocabularyFail("Thêm từ vựng thất bại"));
//       }
// }
// function* handleUpdateVocabulary(action) {
//   try {
//       const data = yield call(Service.updateVocabulary, action.payload.data);
//       yield put(actionVocabulary.editVocabularySucsess("Sửa từ vựng thành công"));
//       yield put(actionVocabulary.getVocabulary(action.payload.pagination_and_search))
//     } catch (error) {
//       yield put(actionVocabulary.editVocabularyFail("Sửa từ vựng thất bại"));
//     }
// }
// function* handleGetVocabulary(action) {
//   try {
//       const data = yield call(Service.getVocabulary, action.payload);
//       let arrayData=data.data.data
//       let totalData=data.data.totalData
//       yield put(actionVocabulary.getVocabularySuccess({data:arrayData,totalData:totalData}))
//     } catch (error) {
//     }
// }

// function* handleDeleteVocabulary(action) {
//   try {
//       const data = yield call(Service.deleteVocabulary, {id:action.payload.id});
//       yield put(actionVocabulary.deleteVocabularySuccess("Xóa từ vựng thành công"))
//       yield put(actionVocabulary.getVocabulary(action.payload.pagination_and_search))
//   } catch (error) {
//     yield put(actionVocabulary.deleteVocabularyFail("Xóa từ vựng thất bại"))
//   }
// }

// export function* addVocabularySaga() {
//     yield takeEvery(actionVocabulary.addVocabulary, handleCreateVocabulary);
// }
// export function* editVocabularySaga() {
//   yield takeEvery(actionVocabulary.editVocabulary, handleUpdateVocabulary);
// }
// export function* handleGetVocabularySaga() {
//   yield takeEvery(actionVocabulary.getVocabulary, handleGetVocabulary);
// }
// export function* handleDeleteVocabularySaga() {
//   yield takeEvery(actionVocabulary.deleteVocabulary, handleDeleteVocabulary);
// }

export function* loginFaceBook() {
    yield takeEvery(actionLogin.loginFacebook, handleLoginFaceBook);
}
export function* loginGoogle() {
  yield takeEvery(actionLogin.loginGoogle, handleLoginGoogle);
}
export function* loginTrandition() {
  yield takeEvery(actionLogin.loginTrandition, handleLoginTrandition);
}
const loginSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: {
    //   [actionVocabulary.addVocabularySucsess]: (state, action) => {
    //       let newState={...state}
    //       newState.isShowPopUp = false
    //       newState.signalAddSuccess = true
    //       MethodCommon.openNotificationSuccess(action.payload)
    //       return newState
    //   },
    //   [actionVocabulary.getVocabularySuccess]: (state, action) => {
    //     let newState={...state}
    //     newState.data=action.payload.data
    //     newState.totalDataState=action.payload.totalData
    //     return newState
    //   },
      [actionLogin.loginTranditionFail]: (state, action) => {
        MessageCommon.openNotificationError(action.payload)
      },
      [actionLogin.loginTranditionSuccess]: (state, action) => {
        MessageCommon.openNotificationSuccess(action.payload)
        setTimeout(() => window.location.href = "/", 400);
        // window.location.href = "/";
      },
    //   [actionVocabulary.deleteVocabularyFail]: (state, action) => {
    //     MethodCommon.openNotificationError(action.payload)
    //   },

    //   [actionVocabulary.editVocabularySucsess]: (state, action) => {
    //     let newState={...state}
    //     newState.isShowPopUpEdit = false
    //     MethodCommon.openNotificationSuccess(action.payload)
    //     return newState
    //   },
    //   [actionVocabulary.editVocabularyFail]: (state, action) => {
    //       MethodCommon.openNotificationError(action.payload)
    //   },
    //   [actionVocabulary.openVocabularyPopup]: (state, action) => {
    //     let newState={...state}
    //     newState.isShowPopUp = true
    //     return newState
    //   },
    //   [actionVocabulary.closeVocabularyPopup]: (state, action) => {
    //     let newState={...state}
    //     newState.isShowPopUp = false
    //     return newState
    //   },
    //   [actionVocabulary.openVocabularyPopupEdit]: (state, action) => {
    //     let newState={...state}
    //     newState.isShowPopUpEdit = true
    //     return newState
    //   },
    //   [actionVocabulary.closeVocabularyPopupEdit]: (state, action) => {
    //     let newState={...state}
    //     newState.isShowPopUpEdit = false
    //     return newState
    //   },
    },
  });
  const { reducer } = loginSlice;
  export default reducer;