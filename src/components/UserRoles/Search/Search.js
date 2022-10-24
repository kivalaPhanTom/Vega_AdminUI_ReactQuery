import React, {useState} from 'react'
import * as mainGroupActions  from "../../../Redux/Actions/MainGroup.action";
import { PAGINATION_DEFAULT } from "../../../Common/Common_Parameter";
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
        dispatch(mainGroupActions.updatePagination({
          pageCurrent: page_index,
          pageSize: page_size
        }))
        dispatch(mainGroupActions.searchAndPaginationData(data))
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
