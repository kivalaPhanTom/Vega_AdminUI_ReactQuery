import React from 'react'
import { Pagination } from 'antd';

function PaginationData(props) {
  const { total, handleChangePagination } =props
  const onChange = (pageNumber, pageSize) => {
    handleChangePagination(pageNumber, pageSize )
  };

  return (
    <Pagination 
      showQuickJumper 
      defaultCurrent={1} 
      total={total} 
      onChange={onChange} 
      showSizeChanger
    />
  )
}


export default PaginationData
