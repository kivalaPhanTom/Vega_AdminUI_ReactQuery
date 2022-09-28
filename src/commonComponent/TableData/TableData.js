import React,{useState,useEffect} from 'react'
import { Divider, Radio, Table } from 'antd';

function TableData(props) {
  const {columns, dataRow, handleUpdateSelectedRows, selectedRows, selectedRowKeysProp, handleUpdateSelectedRowsKey} = props
  // const [selectionType, setSelectionType] = useState('checkbox');
  // const [selectedRowKeys, setSelectedRowKeys] = useState(selectedRowKeysProp);

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    // console.log('selectedRows: ', selectedRows);
    // setSelectedRowKeys(selectedRowKeys);
   
 
    let selectedRowsKey = []
    selectedRows.forEach(element => {
      selectedRowsKey.push(element._id)
    });
    handleUpdateSelectedRows(selectedRows)
    handleUpdateSelectedRowsKey(selectedRowsKey)
  };
  // console.log("selectedRowKeys:",selectedRowKeys)
  useEffect(()=>{
    // setSelectedRowKeys(selectedRows)
  },[selectedRows])

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
    />
  )
}


export default TableData
