import React from 'react'
import { Pagination } from 'antd';

function PaginationData(props) {
  const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };
  return (
    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
  )
}


export default PaginationData
