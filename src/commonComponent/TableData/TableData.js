import React,{useState} from 'react'
import { Divider, Radio, Table } from 'antd';

function TableData(props) {
  const {columns, dataRow} = props
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log('selectedRows: ', selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
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
