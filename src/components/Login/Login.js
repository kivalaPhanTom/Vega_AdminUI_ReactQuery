import React from 'react'
import styles from "./css/index.module.css"
import { BsArrowRightShort } from "react-icons/bs";
import {
    Link,
} from "react-router-dom";
import * as loginActions  from "../../Redux/Actions/Login.action";
import { useSelector, useDispatch } from 'react-redux';

function Login(props) {
    const dispatch = useDispatch();
    const handleLoginFaceBook=()=>{
        console.log("fb")
        dispatch(loginActions.loginFacebook({}))
    }
    const handleLoginGoogle=()=>{
        console.log("gg")
    }
  return (
    <div className={styles['loginArea']}>
         <div className={styles['brand']}>
             <p>Vega</p>
         </div>
         <div  className={styles['information_login']}>
             <p id={styles['p_login']}>Đăng nhập</p>
             <div>
               <input id={styles['email']}  placeholder='Email'></input>
             </div>

             <div>
                <input id={styles['password']} type="password"  placeholder='Mật khẩu'></input>
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
                            <BsArrowRightShort/>
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
    </div>
  )
}



export default Login
