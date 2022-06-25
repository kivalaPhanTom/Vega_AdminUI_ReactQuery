import React from 'react'
import styles from "./css/index.module.css"

function Loading(props) {
  return (
    <div className={styles["section-loading"]}>
        <ul className={styles["list-bars"]}>
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
        </ul>
    </div>
  )
}



export default Loading
