import React, {useState}from 'react'
import styles from "./css/index.module.css"
import { BsArrowRightShort } from "react-icons/bs";
import { Link, } from "react-router-dom";
import * as forgotPasswordActions  from "../../Redux/Actions/ForgotPassword";
import { useSelector, useDispatch } from 'react-redux';
function ForgotPassword(props) {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  
  // change email
  const handleChangeEmail =(e)=>{
    if(e.target.value === ''){
      setErrorEmail(true)
    }else{
      setErrorEmail(false)
    }
      setEmail(e.target.value)
  }

  // handle forgot password
  const handleForgotPassword =()=>{
    if(email === ''){
      setErrorEmail(true)
    }else{
      setErrorEmail(false)
    }
    if(email !== ''){
      const payload ={ email }
      dispatch(forgotPasswordActions.forgotPassword(payload))
    }
  }

  return (
    <div className={styles['forgotArea']}>
         <div className={styles['brand']}>
             <p>Vega</p>
         </div>
         <div  className={styles['information_forgot']}>
             <p id={styles['p_forgot']}>Quên mật khẩu</p>
             <div>
               <input id={styles['email']}  placeholder='Email' onChange={(e)=>handleChangeEmail(e)}></input>
               {errorEmail === true? (
                  <span className={styles['error']}>Email không được để trống</span>
                ):''}
             </div>
              
              <div className={styles['forgot_method']}>
                   <div className={styles['forgot_trandition']}>
                        <div className={styles['icon_submit']} onClick={handleForgotPassword}>
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
