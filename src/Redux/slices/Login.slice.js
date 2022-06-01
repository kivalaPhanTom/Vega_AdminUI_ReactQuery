import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createSlice} from "@reduxjs/toolkit";
import { Service } from '../../components/Login/Services/Services';
import { MessageCommon } from "../../components/Common/message";
import * as actionLogin from '../Actions/Login.action';
// import { API_URL } from '../../../config';
import { API_URL } from '../../config';
const initialState = {
    // isShowPopUp:false,
    // isShowPopUpEdit:false,
    // data:[],
    // signalAddSuccess:false,
    // signnalEditSucces:false,
    // totalDataState:0
}
function* handleLoginFaceBook(action) {
    try {
        // window.open("http://localhost:4000/user/login_fb", "_self");
        window.open(`${API_URL}/user/login_fb`, "_self");
      } catch (error) {
    }
}
function* handleLoginGoogle(action) {
  try {
    // window.open("http://localhost:4000/user/login_gg", "_self");
    window.open(`${API_URL}/user/login_gg`, "_self");
  } catch (error) {
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
    //   [actionVocabulary.addVocabularyFail]: (state, action) => {
    //     MethodCommon.openNotificationError(action.payload)
    //   },
    //   [actionVocabulary.deleteVocabularySuccess]: (state, action) => {
    //     MethodCommon.openNotificationSuccess(action.payload)
    //   },
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