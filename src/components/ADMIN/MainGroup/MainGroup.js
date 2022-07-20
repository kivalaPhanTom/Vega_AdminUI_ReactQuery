import React from 'react'
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import styles from "./css/index.module.css"
import MainGroupTable from './MainGroupTable/MainGroupTable';
import ModalAdd from './ModalAdd/ModalAdd';

function MainGroup(props) {
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
