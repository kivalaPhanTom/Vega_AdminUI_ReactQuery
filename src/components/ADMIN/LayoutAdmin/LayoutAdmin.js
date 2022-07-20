import React ,{useEffect}from 'react'
import { MethodCommon } from "../../Common/methods";
import { useSelector, useDispatch } from 'react-redux';
import * as authorizationActions  from "../../../Redux/Actions/Authorization";
import { USER_ROLE } from "../../Common/Common_Parameter";
import styles from "./css/index.module.css"
import MenuAdmin from '../MenuAdmin/MenuAdmin';

function LayoutAdmin(props) {
  const {component_ui} =props
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
      <div className={styles['menuAdminLeft']}>
        <MenuAdmin/>
      </div>
      <div className={styles['componentRight']}>
          <div className={styles['emptyLeft']}>

          </div>
          <div className={styles['mainContent']}>
            {component_ui}
          </div>
          
      </div>
       
      
    </div>
  )
}



export default LayoutAdmin
