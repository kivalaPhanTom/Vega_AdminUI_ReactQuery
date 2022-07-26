import React,{useState} from 'react'
import 'antd/dist/antd.css';
import { Button, message, Popconfirm } from 'antd';
import styles from "./css/index.module.css"
import { Service } from '../Login/Services/Services';
import { API_URL } from '../../config';
import PopupChangePassword from '../PopupChangePassword/PopupChangePassword';
import { MethodCommon } from "../../Common/methods";
import { METHOD_LOGIN } from "../../Common/Common_Parameter";

function UserInfo(props) {
    const  {handleCloseTooltip} =props
    const [isPopup, setIsPopup] = useState(false)
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')

    const handleLogout =()=>{
        window.open(`${API_URL}/logout`, "_self");
    }
    const handleChangePassword =()=>{
        setIsPopup(true)
        handleCloseTooltip()
    }
    const handleClosePopup =()=>{
        setIsPopup(false)
    }
    const handleOnMouseLeave =()=>{
        handleCloseTooltip()
    }
    return (
        <div className={styles['userInfo_area']} onMouseLeave={handleOnMouseLeave}>
            <div className={styles['avatar_and_name']}>
                 <div className={styles['avatar']}>
                      <img className={styles['avatar_img']} src="https://cdn.iconscout.com/icon/free/png-256/face-1659511-1410033.png" alt=""/>
                 </div>
                 <div className={styles['userName']}>
                     <p>Duy</p>
                 </div>
            </div>
            {
                ( userLocalStorage.Method_login !== METHOD_LOGIN.SOCIAL.toString() && userLocalStorage.id_social === null) ?
                (
                    <div className={styles['changePassword']}>
                        <button id="" onClick={handleChangePassword}>Đổi mật khẩu</button>
                    </div>
                )
                :""
            }
           
            <div className={styles['logOut']}>
               <button onClick ={handleLogout}>Đăng xuất</button>
            </div>

            <PopupChangePassword isPopup={isPopup} handleClosePopup={handleClosePopup}/>
        </div>
    )
}



export default UserInfo
