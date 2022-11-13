import React,{useState} from 'react'
import styles from "./css/index.module.css"
import { BsArrowRightShort } from "react-icons/bs";
import {
    Link,
} from "react-router-dom";
import * as loginActions  from "../../Redux/Actions/Login.action";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../Loading/Loading';

function Login(props) {
    const dispatch = useDispatch();
    const [employeeID, setEmployeeID] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmployeeID, setErrorEmployeeID] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const {isLoading} = useSelector((state)=> state.loadingSlice)
    // change email
   const handleChangeEmployeeID =(e)=>{
        if(e.target.value === ''){
          setErrorEmployeeID(true)
        }else{
          setErrorEmployeeID(false)
        }
        setEmployeeID(e.target.value)
    }

    // change password
    const handleChangePassword =(e)=>{
        if(e.target.value === ''){
        setErrorPassword(true)
        }
        else{
        setErrorPassword(false)
        }
        setPassword(e.target.value)
    }
      // sign up
  const handleLogin=()=>{
    if(employeeID === ''){
      setErrorEmployeeID(true)
    }else{
      setErrorEmployeeID(false)
    }

    if(password === ''){
      setErrorPassword(true)
    }
    else{
      setErrorPassword(false)
    }
    if(employeeID !== '' && password !== ''){
       const payload ={
        employeeID,
        password
       }
       dispatch(loginActions.loginTrandition(payload))
    }
  }

  return (
    <div className={styles['loginArea']}>
         <div className={styles['brand']}>
             <p>Vega</p>
         </div>
         <div  className={styles['information_login']}>
             <p id={styles['p_login']}>Đăng nhập</p>
             <div>
               <input id={styles['email']}  placeholder='Mã nhân viên' onChange={(e)=>handleChangeEmployeeID(e)}></input>
               {errorEmployeeID === true? (
                  <span className={styles['error']}>Mã nhân viên không được để trống</span>
                ):''}
             </div>

             <div>
                <input id={styles['password']} type="password"  placeholder='Mật khẩu' onChange={(e)=>handleChangePassword(e)}></input>
                {errorPassword === true ? (
                      <span  className={styles['error']}>Mật khẩu không được để trống</span>
                    ):''}
             </div>
              
              <div className={styles['login_method']}>
                   <div className={styles['login_social']}>
                      
                        
                   </div>
                   <div className={styles['login_trandition']}>
                        <div className={styles['icon_submit']}>
                            <BsArrowRightShort onClick ={handleLogin}/>
                        </div>
                        <div className={styles['forgot_signup']}>
                            <p id={styles['p_forgot']}>
                                <Link to={'/forgot'}>Quên mật khẩu</Link>
                            </p>
                        </div>
                   </div>

              </div>
         </div>
         { isLoading ? ( <Loading/> ) :''}
        
    </div>
  )
}



export default Login
