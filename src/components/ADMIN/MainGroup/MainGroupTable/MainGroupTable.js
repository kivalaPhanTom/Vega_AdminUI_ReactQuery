import React, { useState,useEffect } from 'react';
import { Divider, Radio, Table } from 'antd';
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import styles from "./css/index.module.css"
import { useSelector, useDispatch } from 'react-redux';
// import * as mainGroupActions  from "../../Redux/Actions/Login.action";
import * as mainGroupActions  from "../../../../Redux/Actions/MainGroup.action";
import TableData from '../../../../commonComponent/TableData/TableData';
import { FaPen,FaTrash } from "react-icons/fa";

const columns = [
    {
      title: 'Mã ngành hàng',
      dataIndex: 'mainGroupId',
    },
    {
      title: 'Tên ngành hàng',
      dataIndex: 'mainGroupName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'mainGroupIsActive',
      render: (status) => {
        let resultStatus = null
        if( status === true)
        {
          resultStatus =<p className={styles['active']}>Đang hoạt động</p>
        }else{
          resultStatus =<p className={styles['inactive']}>Ngừng hoạt động</p>
        }
        return resultStatus
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'mainGroupNote',
    },
    {
      title: 'Người tạo',
      render: (data) => {
        let userCreateResult = <></>
        if( data.UserCreated !== null){
              const {UserCreated_Object} = data
              userCreateResult = <p>{UserCreated_Object.user_name}</p>
        }
        return userCreateResult
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedDate',
      render: (createdDate) => {
           let createdDateResult = <></>
           if( createdDate !== null){

           }
           return createdDateResult
      }
    },
    {
      title: 'Người cập nhật',
      render: (data) => {
        let userUpdateResult = <></>
        if( data.UserUpdated !== null){
              const {UserUpdated_Object} = data
              userUpdateResult = <p>{UserUpdated_Object.user_name}</p>
        }
        return userUpdateResult
      }
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'UpdatedDate',
      render: (UpdatedDate) => {
           let updatedDateResult = <></>
           if( UpdatedDate !== null){

           }
           return updatedDateResult
      }
    },
    {
      title: 'Hành động',
      // dataIndex: 'address',
      render: () => {
        return(
          <div className={styles['icon_actions']}>
            <FaPen className={styles['icon_edit']}/>
            <FaTrash className={styles['icon_delete']}/>
          </div>
        )
      },
    },
  ];

  
function MainGroupTable(props) {
  const dispatch = useDispatch();
  const [selectionType, setSelectionType] = useState('checkbox');
  const {mainGroupList} = useSelector((state)=> state.mainGroupSlice)
  console.log("mainGroupList:",mainGroupList)
  useEffect(() => {
    dispatch(mainGroupActions.searchMainGroup({}))
  },[])
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
           <TableData
              columns={columns}
              dataRow={mainGroupList}
           />
       </div>
      
    </div>
  )
}
export default MainGroupTable
