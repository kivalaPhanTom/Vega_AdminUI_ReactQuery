import { all ,fork} from "redux-saga/effects";
import {  loginFaceBook, loginGoogle,loginTrandition } from "../slices/Login.slice"
import { signUp } from "../slices/SignUp.slice"
import { forgotPasswordSaga } from "../slices/ForgotPassword.slice"
import { checkAuthenticationSaga } from "../slices/Authorization.slice"
import { changePasswordSaga } from "../slices/ChangePassword.slice"
import { mainGroupSagaList} from "../slices/MainGroup.slice"

const sagasList = [
    loginFaceBook(),
    loginGoogle(),
    loginTrandition(),
    signUp(),
    forgotPasswordSaga(),
    checkAuthenticationSaga(),
    changePasswordSaga(),
    mainGroupSagaList()
]
export default function* () {
    yield all(sagasList);
}
  