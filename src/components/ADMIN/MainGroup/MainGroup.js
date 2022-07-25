import React,{useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import styles from "./css/index.module.css"
import MainGroupTable from './MainGroupTable/MainGroupTable';
import ModalAdd from './ModalAdd/ModalAdd';
import * as mainGroupActions  from "../../../Redux/Actions/MainGroup.action";
import { useSelector, useDispatch } from 'react-redux';

import { socket } from '../../../SocketConfig/socket';
function MainGroup(props) {
  const dispatch = useDispatch();
  const {mainGroupList} = useSelector((state)=> state.mainGroupSlice)
  // console.log("mainGroupList:",mainGroupList)
  useEffect(() => {
      dispatch(mainGroupActions.searchMainGroup({}))
  },[])
  return (
    <div className={styles["mainGroup_area"]}>
         <div className={styles["search_and_notify"]}>
               <div className={styles["search_and_notify_container"]}>
                     <div className={styles["search"]}>
                           <FiSearch className={styles["search_icon"]}/>
                           <input placeholder='Tìm kiếm' className={styles["search_input"]}/>
                     </div>
                     <div className={styles["notify"]}>
                         <FaBell/>
                    </div>
               </div>
         </div>

         <div className={styles["table_maingroup"]}>
            <div className={styles["table_maingroup_container"]}>
                <MainGroupTable/>
            </div>     
         </div>
         <ModalAdd/>
    </div>
  )
}



export default MainGroup
