import React ,{useEffect}from 'react'
import { MethodCommon } from "../../Common/methods";
import { useSelector, useDispatch } from 'react-redux';
import * as authorizationActions  from "../../Redux/Actions/Authorization";
import { USER_ROLE,METHOD_LOGIN } from "../../Common/Common_Parameter";
import styles from "./css/LayoutAdmin.module.scss"
import MenuAdmin from '../MenuAdmin/MenuAdmin';
import Loading from '../Loading/Loading';
import SearchInput from './SearchInput/SearchInput';
import Notify from '../Notify/Notify';
import Filtering from './Filtering/Filtering';

function LayoutAdmin(props) {
  const {component_ui} =props
  // const ln = MethodCommon.getLanguage()
  const {isLoading} = useSelector((state)=> state.loadingSlice)
  const dispatch = useDispatch();
  const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
  const userROLE = useSelector(state=> state.authorizationSlice.Role)
  let typelogin = null
  if( MethodCommon.getLocalStorage('TypeLoginVega') === null){
    typelogin = METHOD_LOGIN.GUESS
  }else{
    typelogin = Number(MethodCommon.getLocalStorage('TypeLoginVega'))
  }
  
  useEffect(() => {
    const data ={
      userLocalStorage,
      typelogin
    }
    // dispatch(authorizationActions.getAuthorization(data))
  }, []);

  // if ( userROLE !== USER_ROLE.ADMIN ){
  //       return <p>bạn không được phép truy cập</p>
  // }

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
      { isLoading ? ( <Loading/> ) :''}
      
    </div>
  )
}



export default LayoutAdmin
