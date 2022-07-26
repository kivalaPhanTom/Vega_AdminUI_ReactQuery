import React, {useState} from 'react'
import { Button, Modal } from 'antd';
import styles from "./css/index.module.css"
import useThrottledEffect  from 'use-throttled-effect';
import { MethodCommon } from "../../Common/methods";
import * as changePasswordActions  from "../../Redux/Actions/ChangePassword";
import { useSelector, useDispatch } from 'react-redux';

function PopupChangePassword(props) {
    const dispatch = useDispatch();
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    const {isPopup,handleClosePopup} = props
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [errorCurrentNewPassword, setErrorCurrentNewPassword] = useState(false)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false)
    const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState(false)
    const [errorConfirmNewPasswordSame, setErrorConfirmNewPasswordSame] = useState(false)
    
    const handleOk=()=>{
        if( currentPassword === ''){
            setErrorCurrentNewPassword(true)  
        }
        if(newPassword === ''){
            setErrorConfirmPassword(true) 
        }
        if(confirmNewPassword === ''){
            setErrorConfirmNewPassword(true) 
        }

        if( currentPassword !== '' && newPassword !=="" && confirmNewPassword !==""){
               if(  newPassword === confirmNewPassword){
                const {Method_login, user_email} = userLocalStorage 
                const data ={
                    user_email,
                    Method_login,
                    currentPassword,
                    newPassword
                }
                dispatch(changePasswordActions.changePassword(data))
                 console.log("cho phép gọi API")
               }
        }


    }
    const handleCancel=()=>{
        handleClosePopup()
    }

    const handleChangeCurrentPassword =(e)=>{
            if(e.target.value !== ''){
                setCurrentPassword(e.target.value)
                setErrorCurrentNewPassword(false)
            }else{
                setErrorCurrentNewPassword(true)
            }
            
    }
    useThrottledEffect(()=>{
        if(confirmNewPassword !== newPassword ) {
           setErrorConfirmNewPasswordSame(true)
        }else{
            setErrorConfirmNewPasswordSame(false)
        }
      }, 3000 ,[confirmNewPassword]);


    const handleChangeNewPassword =(e)=>{
        if(e.target.value !== ''){
            setNewPassword(e.target.value)
            setErrorConfirmPassword(false)
        }else{
            setErrorConfirmPassword(true)
        }
    }
    const handleChangeConfirmNewPassword =(e)=>{
        if(e.target.value !== ''){
        
            setConfirmNewPassword(e.target.value)
            setErrorConfirmNewPassword(false)
        }else{
            setErrorConfirmNewPassword(true)
        }
    }
    
  return (
    <Modal 
      className={styles['modalChangePassword']}
      title="Đổi mật khẩu" 
      visible={isPopup} 
      onOk={handleOk} 
      okText="Lưu"
      cancelText="Hủy"
      onCancel={handleCancel}
    >
       <div>
           <div className={styles['currentPassword']}>
               <p>Mật khẩu hiện tại</p>
               <input className= {styles['custom_input']} type ="password" onChange ={handleChangeCurrentPassword}/>
               {errorCurrentNewPassword? (<p id={styles['errorCurrentPassword']}>Bắt buộc nhập</p>):''}
              
           </div>

           <div className={styles['div_changePassword']}>  
                <div className={styles['newPassword']}>
                    <p>Mật khẩu mới</p>
                    <input className= {styles['custom_input']} type ="password" onChange ={handleChangeNewPassword}/>
                    {errorConfirmPassword? (<p id={styles['errorNewPassword']}>Bắt buộc nhập</p>):''}
                    
                </div>
                <div className={styles['confirmNewPassword']}>
                    <p>Xác nhận mật khẩu mới</p>
                    <input className= {styles['custom_input']} type ="password" onChange ={handleChangeConfirmNewPassword}/>
                    {errorConfirmNewPassword? (<p id={styles['errorConfirmNewPassword']}>Bắt buộc nhập</p>):''}
                    {errorConfirmNewPasswordSame ? (<p id={styles['errorConfirmNewPassword']}>Không khớp với mật khẩu mới</p>):''}
                </div>
           </div>
           
       </div>
  </Modal>
  )
}



export default PopupChangePassword
