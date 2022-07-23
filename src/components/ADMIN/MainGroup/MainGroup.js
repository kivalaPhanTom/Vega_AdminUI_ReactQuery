import React,{useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import styles from "./css/index.module.css"
import MainGroupTable from './MainGroupTable/MainGroupTable';
import ModalAdd from './ModalAdd/ModalAdd';
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:4000";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:4000";
// import { socket } from './SocketConfig/socket';
import { socket } from '../../../SocketConfig/socket';
function MainGroup(props) {
      // const socket = socketIOClient(ENDPOINT);
      // const socket = socketIOClient(ENDPOINT);
useEffect(() => {
      socket.emit("fetchMainGroup");
  
      socket.on("fetchMainGroup", fetchMainGroup=> {
             console.log("fetchMainGroup:",fetchMainGroup)
      })
  })
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
