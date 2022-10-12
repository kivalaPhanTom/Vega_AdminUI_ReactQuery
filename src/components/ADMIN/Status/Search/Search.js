import React, {useState} from 'react'
import * as statusActions  from "../../../../Redux/Actions/Status.action";
import { PAGINATION_DEFAULT } from "../../../../Common/Common_Parameter";
import { useDispatch } from 'react-redux';
import SearchData from '../../SearchData/SearchData';

function Search(props) {
    const dispatch = useDispatch();
    const [keySearch, setKeySearch] = useState('')
    
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
        dispatch(statusActions.updatePagination({
          pageCurrent: page_index,
          pageSize: page_size
        }))
        dispatch(statusActions.searchAndPaginationData(data))
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
