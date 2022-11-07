import React,{useState,useEffect} from 'react'
import { Divider, Radio, Table } from 'antd';

function TableData(props) {
  const {columns, dataRow, handleUpdateSelectedRows, selectedRows, selectedRowKeysProp, handleUpdateSelectedRowsKey, 
    pageCurrent,pageSize, width } = props
  

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    let selectedRowsKey = []
    selectedRows.forEach(element => {
      selectedRowsKey.push(element._id)
    });
    handleUpdateSelectedRows(selectedRows)
    handleUpdateSelectedRowsKey(selectedRowsKey)
  };
  

  const rowSelection = {
    selectedRowKeysProp,
    onChange: onSelectChange,
  };

  return (
    <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataRow}
        pagination={false}
        scroll={{ x: width}}
    />
  )
}


export default TableData
