import React, {useState,useEffect} from 'react'
import styles from "./css/index.module.css"
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
import * as authorizationActions  from "../../Redux/Actions/Authorization";
import { useSelector, useDispatch } from 'react-redux';
import { MethodCommon } from "../../Common/methods";
import { USER_ROLE, METHOD_LOGIN } from "../../Common/Common_Parameter";
import { Link } from "react-router-dom";
import { Button, Divider, Tooltip } from 'antd';
import UserInfo from '../UserInfo/UserInfo';

function Menu(props) {
  const dispatch = useDispatch();
  const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
  const [isToolTip, setIsToolTip] = useState(false)
  const userROLE = useSelector(state=> state.authorizationSlice.Role)
  let typelogin = null
  if( MethodCommon.getLocalStorage('TypeLoginVega') === null){
    typelogin = METHOD_LOGIN.GUESS
  }else{
    typelogin = Number(MethodCommon.getLocalStorage('TypeLoginVega'))
  }
 
  
  useEffect(() => {
    const data ={
      userLocalStorage,
      typelogin
    }
    dispatch(authorizationActions.getAuthorization(data))
  }, []);
  
  const handleOnMouseEnter =()=>{
    setIsToolTip(true)
  }
  const handleCloseTooltip =()=>{
    setIsToolTip(false)
  }

  return (
    <div className={styles['menu_area']}>
         <ul className ={styles['vega_menu']}> 
             <li>
                <Link to="/cc"><span className={styles['name_menu_item']}>HOME</span></Link>
              
                {/* <div className={styles['dot_menu_item']}></div> */}
            </li>
             <li>
                <span  to="/bb" className={styles['name_menu_item']}>LIÊN HỆ</span>
                {/* <div className={styles['dot_menu_item']}></div> */}
            </li>
            {
                userROLE === USER_ROLE.ADMIN ?
                ( <li>
                    {/* <Link to="/dd"><span className={styles['name_menu_item']}>TRANG QUẢN LÝ</span></Link> */}
                    <Link to="/adminVega"><span className={styles['name_menu_item']}>TRANG QUẢN LÝ</span></Link>
                   
                    {/* <div className={styles['dot_menu_item']}></div> */}
                </li>)
                : ''
            }
            {
                userROLE !== USER_ROLE.GUESS ? 
                (
                  <li>
                  <Tooltip visible={isToolTip} title={<UserInfo handleCloseTooltip={handleCloseTooltip}/>} color={'#93b55e'} key={'account'}>
                      <span className={styles['name_menu_item']} onMouseEnter={handleOnMouseEnter} >TÀI KHOẢN</span>
                    </Tooltip>
                    
                    {/* <div className={styles['dot_menu_item']}></div> */}
                </li>
                ):""
            }
            {
                userROLE === USER_ROLE.GUESS ? 
                (
                  <li>
                      <Link to="/login"><span className={styles['name_menu_item']}>ĐĂNG NHẬP</span></Link>
                  </li>
                ):""
            }
             
             <li>
                 <div className= {styles['list_icon']}>

                      <div className={styles['search']}>
                          <BsSearch className={styles['icon_menu_item']}/>
                      </div>

                      <div className={styles['love']}>
                         <div className={styles['div_love']}>
                            
                            <div className={styles['love_number']}>
                               <span>10</span>
                            </div>
                            <div className={styles['icon_heart']}>
                               <AiOutlineHeart className={styles['icon_menu_item']}/>
                            </div>
                         </div>
                      </div>

                      <div className={styles['cart']}>
                         <div className={styles['div_cart']}>
                             <div className={styles['cart_number']}>
                                 <span>10</span>
                             </div>
                             <div className={styles['icon_cart']}>
                             <BiCartAlt className={styles['icon_menu_item']}/>
                             </div>
                         </div>
                      </div>

                 </div>
             </li>
         </ul>
    </div>
  )
}


export default Menu
