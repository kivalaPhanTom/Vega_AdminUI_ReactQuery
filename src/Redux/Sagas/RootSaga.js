import { all } from "redux-saga/effects";
import {  loginFaceBook, loginGoogle } from "../slices/Login.slice"
import { signUp } from "../slices/SignUp.slice"
import { forgotPasswordSaga } from "../slices/ForgotPassword.slice"

const sagasList = [
    loginFaceBook(),
    loginGoogle(),
    signUp(),
    forgotPasswordSaga()
]
export default function* () {
    yield all(sagasList);
}
  