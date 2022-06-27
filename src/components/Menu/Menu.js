import React, {useEffect} from 'react'
import styles from "./css/index.module.css"
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
// import * as loginActions  from "../../Redux/Actions/Login.action";
import * as authorizationActions  from "../../Redux/Actions/Authorization";
import { useSelector, useDispatch } from 'react-redux';
import { MethodCommon } from "../Common/methods";
// import { LANGUAGE } from "./Common_Parameter";
import { USER_ROLE } from "../Common/Common_Parameter";

function Menu(props) {
  const dispatch = useDispatch();
  const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
  const userROLE = useSelector(state=> state.authorizationSlice.Role)
  console.log("USER_ROLE:",userROLE)
  console.log("USER_ROLE.ADMIN:",USER_ROLE.ADMIN)
   
  useEffect(() => {
    dispatch(authorizationActions.getAuthorization(userLocalStorage))
  }, []);

  return (
    <div className={styles['menu_area']}>
         <ul className ={styles['vega_menu']}> 
             <li>
                <span className={styles['name_menu_item']}>HOME</span>
                {/* <div className={styles['dot_menu_item']}></div> */}
            </li>
             <li>
                <span className={styles['name_menu_item']}>LIÊN HỆ</span>
                {/* <div className={styles['dot_menu_item']}></div> */}
            </li>
            {
                userROLE === USER_ROLE.ADMIN ?
                ( <li>
                    <span className={styles['name_menu_item']}>TRANG QUẢN LÝ</span>
                    {/* <div className={styles['dot_menu_item']}></div> */}
                </li>)
                : ''
            }
             <li>
                <span className={styles['name_menu_item']}>TÀI KHOẢN</span>
                {/* <div className={styles['dot_menu_item']}></div> */}
            </li>
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
