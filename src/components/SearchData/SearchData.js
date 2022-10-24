import React from 'react'
import styles from "./css/index.module.css"
import { FiSearch } from "react-icons/fi";
import { MethodCommon } from "../../Common/methods";

function SearchData(props) {
  const {value, handkeSetKeySearch, handleSubmit} = props

  const handleChangeKeySearch =(e)=>{
      const value = MethodCommon.preventSpecialCharacters(e.target.value)
      handkeSetKeySearch(value)
  }
  const handleEnter =(e)=>{
      if (e.key === "Enter") {
          handleSubmit()
      }
  }
  const onSearchData =()=>{
    handleSubmit()
  }

  return (
      <div className={styles["search"]}>
            <input 
              value={value} 
              placeholder='Tìm kiếm' 
              className={styles["search_input"]}
              onChange ={handleChangeKeySearch}
              onKeyPress={handleEnter}
            />
            <FiSearch 
              className={styles["search_icon"]} 
              onClick={onSearchData}
            />
      </div>
  )
}


export default SearchData
