import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import styles from "./css/index.module.css"
import { useSelector, useDispatch } from 'react-redux';
// import * as mainGroupActions  from "../../Redux/Actions/Login.action";
import * as mainGroupActions  from "../../../../Redux/Actions/MainGroup.action";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ]; // rowSelection object indicates the need for row selection
  
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


function MainGroupTable(props) {
  const dispatch = useDispatch();
  const [selectionType, setSelectionType] = useState('checkbox');
  const handleDelete=()=>{

  }
  const handleAdd=()=>{
    dispatch(mainGroupActions.openModalAddMainGroup({}))
  }
  return (
    <div className={styles["mainGroupTable"]}>
       <div className={styles["table_heaader"]}>
              <div className={styles["table_heaader_container"]}>
                  <div className={styles["table_title"]}>
                      <span id={styles["title_manage"]}>Quản lý nhóm hàng</span>
                  </div>
                  <div className={styles["table_actions"]}>
                       <div className={styles["delete_Action"]} onClick ={handleDelete}>
                          <AiFillDelete className={styles["icon_action"]}/>
                          <span className={styles["label_btn"]}>Xoá</span>
                       </div>
                       <div className={styles["add_Action"]} onClick={handleAdd}>
                            <AiFillPlusCircle className={styles["icon_action"]}/>
                            <span className={styles["label_btn"]}>Thêm mới</span>
                       </div> 
                  </div>
              </div>
       </div>

      {/* <Divider /> */}
       <div className={styles["table"]}>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
       </div>
      
    </div>
  )
}
export default MainGroupTable
