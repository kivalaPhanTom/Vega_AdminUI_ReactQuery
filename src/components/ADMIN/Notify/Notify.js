import React from 'react'
import { FaBell } from "react-icons/fa";
import styles from "./css/index.module.css"

function Notify(props) {
  return (
    <>
        <FaBell className={styles['bellIcon']}/>
        <div className={styles['notifyQuanity']}>
            <span>1</span>
        </div>
    </>
  )
}


export default Notify
