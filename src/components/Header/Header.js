import React from 'react'
import Menu from '../Menu/Menu'
import styles from "./css/index.module.css"

function Header(props) {
  return (
    <div className={styles['header_area']}>
         <div className={styles['topHeader']}>
              <div className={styles['brand_header']}>
                   <p id={styles['name_brand']}>Vega</p>
                   <span id={styles['brand_note']}>Vegetable market</span>
              </div>
         </div>
         <div className="menu">
              <Menu/>
          </div>
    </div>
  )
}

export default Header
