import { all } from "redux-saga/effects";
import { loginTrandition } from "../slices/Login.slice"
import { signUp } from "../slices/SignUp.slice"
import { forgotPasswordSaga } from "../slices/ForgotPassword.slice"
import { checkAuthenticationSaga } from "../slices/Authorization.slice"
import { changePasswordSaga } from "../slices/ChangePassword.slice"
import { mainGroupSagaList} from "../slices/MainGroup.slice"
// import { statusSagaList} from "../slices/Status.slice"
import { employeesSagaList} from "../slices/Employees.slice"

// import { userRoleSagaList} from "./UserRoleSaga/UserRoleSaga"

const sagasList = [
    loginTrandition(),
    signUp(),
    forgotPasswordSaga(),
    checkAuthenticationSaga(),
    changePasswordSaga(),
    mainGroupSagaList(),
    // statusSagaList(),
    employeesSagaList(),
    // userRoleSagaList(),

]
export default function* () {
    yield all(sagasList);
}
  