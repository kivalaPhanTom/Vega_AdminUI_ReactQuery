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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const {isLoading} = useSelector((state)=> state.loadingSlice)

    const handleLoginFaceBook=()=>{
        dispatch(loginActions.loginFacebook({}))
    }
    const handleLoginGoogle=()=>{
        dispatch(loginActions.loginGoogle({}))
    }

    // change email
   const handleChangeEmail =(e)=>{
        if(e.target.value === ''){
        setErrorEmail(true)
        }else{
        setErrorEmail(false)
        }
        setEmail(e.target.value)
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
    if(email === ''){
      setErrorEmail(true)
    }else{
      setErrorEmail(false)
    }

    if(password === ''){
      setErrorPassword(true)
    }
    else{
      setErrorPassword(false)
    }
    if(email !== '' && password !== ''){
       const payload ={
        email,
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
               <input id={styles['email']}  placeholder='Email' onChange={(e)=>handleChangeEmail(e)}></input>
               {errorEmail === true? (
                  <span className={styles['error']}>Email không được để trống</span>
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
                       <div id={styles['loginFacebook']} >
                         <button onClick={handleLoginFaceBook}>Facebook</button>
                       </div>
                       <div id={styles['loginGoogle']}>
                          <button onClick={handleLoginGoogle}>Google</button>
                       </div>
                        
                   </div>
                   <div className={styles['login_trandition']}>
                        <div className={styles['icon_submit']}>
                            <BsArrowRightShort onClick ={handleLogin}/>
                        </div>
                        <div className={styles['forgot_signup']}>
                            <p id={styles['p_forgot']}>
                                <Link to={'/forgot'}>Quên mật khẩu</Link>
                            </p>
                            <p id={styles['p_signup']}>
                                <Link to={'/register'}>Đăng kí</Link>
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
