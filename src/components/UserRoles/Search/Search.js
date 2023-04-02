import React from 'react'
import { PAGINATION_DEFAULT } from "../../../Common/Common_Parameter";
import { useDispatch } from 'react-redux';
import SearchData from '../../SearchData/SearchData';
import * as userRoleActions  from "../../../Redux/Actions/UserRole.action";

function Search(props) {
    const {keySearch, setKeySearch} = props
    const dispatch = useDispatch();
    
    const handkeSetKeySearch =(value)=>{
      setKeySearch(value)
    }

    const handleSubmit =()=>{
      handleChangePagination(PAGINATION_DEFAULT.pageCurrent, PAGINATION_DEFAULT.pageSize)
    }

    const handleChangePagination =(page_index, page_size)=>{
        const data = {
          pageCurrent: page_index,
          pageSize: page_size,
          keySearch: keySearch
        }
        dispatch(userRoleActions.updatePagination({
          pageCurrent: page_index,
          pageSize: page_size
        }))
        dispatch(userRoleActions.searchAndPaginationData(data))
        
    }

    return (
        <SearchData 
          value={keySearch} 
          handkeSetKeySearch={handkeSetKeySearch}
          handleSubmit={handleSubmit}
        />
    )
}

export default Search
