import React, {useState} from 'react'
import styles from "./css/index.module.css"
import { BsArrowRightShort } from "react-icons/bs";
import {
    Link,
} from "react-router-dom";

import * as signUpActions  from "../../Redux/Actions/SignUp.action";
import { useSelector, useDispatch } from 'react-redux';

function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const dispatch = useDispatch();
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
  const handleSignUp=()=>{
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
       dispatch(signUpActions.signUp(payload))
    }
  }

  return (
    <div className={styles['registerArea']}>
         <div className={styles['brand']}>
             <p>Vega</p>
         </div>
         <div  className={styles['information_register']}>
             <p id={styles['p_register']}>Đăng kí</p>
             <div>
               <input 
                  id={styles['email']}  
                  placeholder='Email'
                  onChange={(e)=>handleChangeEmail(e)}
                >

                </input>
                {errorEmail === true? (
                  <span className={styles['error']}>Email không được để trống</span>
                ):''}
                
             </div>

             <div>
                <input 
                   id={styles['password']} 
                   type="password"  
                   placeholder='Mật khẩu'
                   onChange={(e)=>handleChangePassword(e)}
                  ></input>

                   {errorPassword === true ? (
                      <span  className={styles['error']}>Mật khẩu không được để trống</span>
                    ):''}
                
             </div>
              
              <div className={styles['register_method']}>
                   <div className={styles['register_trandition']}>
                        <div className={styles['icon_submit']} onClick={handleSignUp}>
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
