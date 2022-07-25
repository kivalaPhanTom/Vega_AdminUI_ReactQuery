import React,{useState} from 'react'
import { Divider, Radio, Table } from 'antd';

function TableData(props) {
  const {columns, dataRow} = props
  const [selectionType, setSelectionType] = useState('checkbox');
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <Table
        rowSelection={{
        type: selectionType,
        ...rowSelection,
        }}
        columns={columns}
        dataSource={dataRow}
        pagination={false}
    />
  )
}


export default TableData
