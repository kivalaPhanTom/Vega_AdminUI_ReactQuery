import React,{useState,useEffect} from 'react'
import { Divider, Radio, Table } from 'antd';

function TableData(props) {
  const {columns, dataRow, handleUpdateSelectedRows, selectedRows, selectedRowKeysProp, handleUpdateSelectedRowsKey, pageCurrent,pageSize} = props
  // const [selectionType, setSelectionType] = useState('checkbox');
  // const [selectedRowKeys, setSelectedRowKeys] = useState(selectedRowKeysProp);
//  console.log("pageCurrent:",pageCurrent)
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    // console.log('selectedRows xxx: ', selectedRows);
    // setSelectedRowKeys(selectedRowKeys);
   
 
    let selectedRowsKey = []
    console.log("selectedRowy:",selectedRows)
    selectedRows.forEach(element => {
      selectedRowsKey.push(element._id)
    });
    console.log("selectedRowsxxx:",selectedRows)
    console.log("selectedRowsKeyxxx:",selectedRowsKey)
    handleUpdateSelectedRows(selectedRows)
    handleUpdateSelectedRowsKey(selectedRowsKey)
  };
  console.log("selectedRowKeysProp:",selectedRowKeysProp)
  // useEffect(()=>{
  //   // setSelectedRowKeys(selectedRows)
  //   // console.log("xx")
  // },[pageSize,pageCurrent, selectedRows ])

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
