import { all ,fork} from "redux-saga/effects";
import {  loginFaceBook, loginGoogle,loginTrandition } from "../slices/Login.slice"
import { signUp } from "../slices/SignUp.slice"
import { forgotPasswordSaga } from "../slices/ForgotPassword.slice"
import { checkAuthenticationSaga } from "../slices/Authorization.slice"
import { changePasswordSaga } from "../slices/ChangePassword.slice"
// import { createMainGroup,  flowMainGroup} from "../slices/MainGroup.slice"
import { flowMainGroup} from "../slices/MainGroup.slice"

const sagasList = [
    loginFaceBook(),
    loginGoogle(),
    loginTrandition(),
    signUp(),
    forgotPasswordSaga(),
    checkAuthenticationSaga(),
    changePasswordSaga(),
    // createMainGroup(),
    // flowMainGroup()
    // searchMainGroup(),
    
]
export default function* () {
    yield fork(flowMainGroup);
    yield all(sagasList);
   
}
  