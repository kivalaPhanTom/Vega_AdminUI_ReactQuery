import React,{useEffect} from 'react'
import { Service } from '../Login/Services/Services';
import { MessageCommon } from "../Common/message";
import { MethodCommon } from "../Common/methods";
import { useNavigate } from "react-router-dom";
import { RESULT_STATUS } from "../Common/Common_Parameter";

function Layout(props) {
    const navigate = useNavigate();
    const ln = MethodCommon.getLanguage()
  
    useEffect(() => {
        const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
       
        Service.loginAuthenticate(userLocalStorage).then((response)=>{
         console.log("response:",response)
         const status =response.data
         switch (status.result) {
          case RESULT_STATUS.SUCCESS:
            MethodCommon.saveLocalStorage("UserVega",status.data)
            break;
          case RESULT_STATUS.REFRESH_TOKEN_SUCCESS:
            break;
          case RESULT_STATUS.ERROR_AUTHENTICATE:
              MessageCommon.openNotificationError(ln.messageModule.ERROR_AUTHENTICATE)
              navigate("/login");
              break;
        default:
              MessageCommon.openNotificationError(ln.messageModule.ERROR_SYSTEM)
              break;
         }
        })
        
      }, []);
  return (
    <div>Layout</div>
  )
}

export default Layout
