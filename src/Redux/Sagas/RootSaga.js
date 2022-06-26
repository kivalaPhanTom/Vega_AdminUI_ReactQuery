import { all } from "redux-saga/effects";
import {  loginFaceBook, loginGoogle,loginTrandition } from "../slices/Login.slice"
import { signUp } from "../slices/SignUp.slice"
import { forgotPasswordSaga } from "../slices/ForgotPassword.slice"
import { checkAuthenticationSaga } from "../slices/Authorization.slice"

const sagasList = [
    loginFaceBook(),
    loginGoogle(),
    loginTrandition(),
    signUp(),
    forgotPasswordSaga(),
    checkAuthenticationSaga()
]
export default function* () {
    yield all(sagasList);
}
  