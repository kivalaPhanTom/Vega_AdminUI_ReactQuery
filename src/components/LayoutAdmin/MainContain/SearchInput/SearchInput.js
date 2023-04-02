import React, {useState} from 'react'
// import * as statusActions  from "../../../Redux/Actions/Status.action";
// import * as employeesActions  from "../../../Redux/Actions/Employees";
// import { PAGINATION_DEFAULT } from "../../../Common/Common_Parameter";
import { useDispatch } from 'react-redux';
import SearchData from '../../../SearchData/SearchData';

function SearchInput(props) {
  const {keySearch, setKeySearch, handleSubmitSearch} = props
    const dispatch = useDispatch();
    // const [keySearch, setKeySearch] = useState('')
    
    const handkeSetKeySearch =(value)=>{
      setKeySearch(value)
    }

    const handleSubmit =()=>{
       handleSubmitSearch()
      // handleChangePagination(PAGINATION_DEFAULT.pageCurrent, PAGINATION_DEFAULT.pageSize)
    }

    // const handleChangePagination =(page_index, page_size)=>{
    //     const data = {
    //       pageCurrent: page_index,
    //       pageSize: page_size,
    //       keySearch: keySearch
    //     }
    //     dispatch(employeesActions.updatePagination({
    //       pageCurrent: page_index,
    //       pageSize: page_size
    //     }))
    //     dispatch(employeesActions.searchAndPaginationData(data))
    // }

    return (
        <SearchData 
          value={keySearch} 
          handkeSetKeySearch={handkeSetKeySearch}
          handleSubmit={handleSubmit}
        />
    )
}

export default SearchInput
