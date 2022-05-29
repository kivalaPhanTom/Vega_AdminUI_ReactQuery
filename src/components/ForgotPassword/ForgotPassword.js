import React from 'react'
import styles from "./css/index.module.css"
import { BsArrowRightShort } from "react-icons/bs";
import {
    Link,
} from "react-router-dom";

function ForgotPassword(props) {
  return (
    <div className={styles['forgotArea']}>
         <div className={styles['brand']}>
             <p>Vega</p>
         </div>
         <div  className={styles['information_forgot']}>
             <p id={styles['p_forgot']}>Quên mật khẩu</p>
             <div>
               <input id={styles['email']}  placeholder='Email'></input>
             </div>
              
              <div className={styles['forgot_method']}>
                   <div className={styles['forgot_trandition']}>
                        <div className={styles['icon_submit']}>
                            <BsArrowRightShort/>
                        </div>
                        <div className={styles['comeback']}>
                            <p className={styles['p_comeback']}>
                                <Link to={'/login'}>Quay về</Link>
                            </p>
                        </div>
                   </div>

              </div>
         </div>
    </div>
  )
}



export default ForgotPassword
