import React from 'react'
import styles from "./css/index.module.css"
import { BsArrowRightShort } from "react-icons/bs";
import {
    Link,
} from "react-router-dom";
function Register(props) {
  return (
    <div className={styles['registerArea']}>
         <div className={styles['brand']}>
             <p>Vega</p>
         </div>
         <div  className={styles['information_register']}>
             <p id={styles['p_register']}>Đăng kí</p>
             <div>
               <input id={styles['email']}  placeholder='Email'></input>
             </div>

             <div>
                <input id={styles['password']} type="password"  placeholder='Mật khẩu'></input>
             </div>
              
              <div className={styles['register_method']}>
                   <div className={styles['register_trandition']}>
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



export default Register
