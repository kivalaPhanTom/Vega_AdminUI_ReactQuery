import React,{useEffect} from 'react'
import { Service } from '../Login/Services/Services';
import { MessageCommon } from "../../Common/message";
import { MethodCommon } from "../../Common/methods";
import { useNavigate } from "react-router-dom";
import { RESULT_STATUS } from "../../Common/Common_Parameter";
import Header from '../Header/Header';
import Loading from '../Loading/Loading';

function Layout(props) {
    const navigate = useNavigate();
    const ln = MethodCommon.getLanguage()
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    
    useEffect(() => {
      try {
          Service.loginAuthenticate(userLocalStorage).then((response, err)=>{
            const status = response.data
            
            switch (status.result) {
                case RESULT_STATUS.SUCCESS:
                  MethodCommon.saveLocalStorage("UserVega",status.data)
                  break;
                case RESULT_STATUS.REFRESH_TOKEN_SUCCESS:
                  break;
                case RESULT_STATUS.ERROR_AUTHENTICATE:
                    navigate("/login");
                    break;
                case RESULT_STATUS.ACCOUNT_NOT_FOUND:
                      navigate("/login");
                      break;
                default:
                    MessageCommon.openNotificationError(ln.messageModule.ERROR_SYSTEM)
                    break;
            }

          })
          
        } catch (error) {
            MessageCommon.openNotificationError(ln.messageModule.ERROR_SYSTEM)
        }
      }, []);
  return (
    <div>
       <Header/>
         Layout
      </div>
  )
}

export default Layout
