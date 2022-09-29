import React, {useState} from 'react'
import styles from "./index.module.css"
import { FiSearch } from "react-icons/fi";
import { MethodCommon } from "../../../../Common/methods";
import * as mainGroupActions  from "../../../../Redux/Actions/MainGroup.action";
import { PAGINATION_DEFAULT } from "../../../../Common/Common_Parameter";
import { useSelector, useDispatch } from 'react-redux';

function Search(props) {
    const dispatch = useDispatch();
    const [keySearch, setKeySearch] = useState('')

    const handleChangeKeySearch =(e)=>{
        const value = MethodCommon.preventSpecialCharacters(e.target.value)
        setKeySearch(value)
    }
    const handleEnter =(e)=>{
        if (e.key === "Enter") {
            handleChangePagination(PAGINATION_DEFAULT.pageCurrent, PAGINATION_DEFAULT.pageSize)
        }
    }
    const onSearchData =()=>{
        handleChangePagination(PAGINATION_DEFAULT.pageCurrent, PAGINATION_DEFAULT.pageSize)
    }
    const handleChangePagination =(page_index, page_size)=>{
        const data = {
          pageCurrent: page_index,
          pageSize: page_size,
          keySearch: keySearch
        }
        dispatch(mainGroupActions.updatePagination({
          pageCurrent: page_index,
          pageSize: page_size
        }))
        dispatch(mainGroupActions.searchAndPaginationData(data))
      }

     
    return (
        <div className={styles["search"]}>
            <input 
              value={keySearch} 
              placeholder='Tìm kiếm' 
              className={styles["search_input"]}
              onChange ={handleChangeKeySearch}
              onKeyPress={handleEnter}
            />
            <FiSearch className={styles["search_icon"]} onClick={onSearchData}/>
        </div>
    )
}

export default Search
