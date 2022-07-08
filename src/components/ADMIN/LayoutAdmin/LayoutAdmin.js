import React ,{useEffect}from 'react'
import { MethodCommon } from "../../Common/methods";
import { useSelector, useDispatch } from 'react-redux';
import * as authorizationActions  from "../../../Redux/Actions/Authorization";
import { USER_ROLE } from "../../Common/Common_Parameter";
import styles from "./css/index.module.css"
import MenuAdmin from '../MenuAdmin/MenuAdmin';

function LayoutAdmin(props) {

  // const ln = MethodCommon.getLanguage()

  const dispatch = useDispatch();
  const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
  const userROLE = useSelector(state=> state.authorizationSlice.Role)

  useEffect(() => {
    dispatch(authorizationActions.getAuthorization(userLocalStorage))
  }, []);

  if ( userROLE !== USER_ROLE.ADMIN ){
        return <p>bạn không được phép truy cập</p>
  }

  return (
    <div className={styles['layoutAdmin']}>
       <MenuAdmin/>
    </div>
  )
}



export default LayoutAdmin
