import React, { useState, useEffect, memo } from 'react';
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import styles from "./UserRolesTable.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import * as userRoleActions  from "../../../Redux/Actions/UserRole.action";
import TableData from '../../../commonComponent/TableData/TableData';
import { MethodCommon } from "../../../Common/methods";
import { FaPen, FaTrash } from "react-icons/fa";
import { MessageCommon } from "../../../Common/message";
import PaginationData from '../../../commonComponent/PaginationData/PaginationData';

function UserRolesTable(props) {
    const dispatch = useDispatch();
    const { selectedRows, selectedRowKeys, handleSetSelectedRows, handleSetSelectedRowKeys, keySearch } = props
    const userRoleList = useSelector((state)=> state.userRoleSlice.userRoleList)
    const totalData = useSelector((state)=> state.userRoleSlice.totalData)
    const pagination = useSelector((state)=> state.userRoleSlice.pagination)
    const columns = [
      {
        title: 'Mã vai trò',
        dataIndex: 'userRoleCode',
      },
      {
        title: 'Tên vai trò',
        dataIndex: 'userRoleName',
      },
      {
        title: 'Người tạo',
        render: (data) => {
          let userCreateResult = <></>
          if( data.UserCreated !== null){
                const {UserCreated_Object} = data
                userCreateResult = <span>{UserCreated_Object !== null ? UserCreated_Object.user_name :""}</span>
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
              createdDateResult = <span>{MethodCommon.formatTime(createdDate)}</span>
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
                userUpdateResult = <p>{UserUpdated_Object !== null ? UserUpdated_Object.user_name : ""}</p>
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
              updatedDateResult = <span>{MethodCommon.formatTime(UpdatedDate)}</span>
            }
            return updatedDateResult
        }
      },
      {
        title: 'Hành động',
        render: (item) => {
          return(
            <div className={styles['icon_actions']}>
              <FaPen onClick = {()=>handleConfirmEditItem(item)} className={styles['icon_edit']}/>
              <FaTrash onClick = {()=>handleConfirmDeleteItem(item)} className={styles['icon_delete']}/>
            </div>
          )
        },
      },
    ];
    
    useEffect(() => {
      const dataSocket = {
        pageCurrent: pagination.pageCurrent,
        pageSize: pagination.pageSize,
        keySearch:keySearch
      }
      dispatch(userRoleActions.searchBySocket(dataSocket))
    },[])
   
    const handleChangePagination =(page_index, page_size)=>{
      const data = {
        pageCurrent: page_index,
        pageSize: page_size,
        keySearch:keySearch
      }
      dispatch(userRoleActions.updatePagination({
        pageCurrent: page_index,
        pageSize: page_size
      }))
      dispatch(userRoleActions.searchAndPaginationData(data))
    }

    const handleConfirmEditItem =(item)=>{
      const dataEdit = {
          id: item._id,
          userRoleCode: item.userRoleCode,
          userRoleName: item.userRoleName,
      }
      dispatch(userRoleActions.updateDataEdit(dataEdit))
      dispatch(userRoleActions.setConfirmEdit(true))
    }

    const handleConfirmDeleteItem=(item)=>{
      handleSetSelectedRows([item])
      dispatch(userRoleActions.setConfirmDelete(true))
    } 

    const handleUpdateSelectedRows =(values)=>{
      handleSetSelectedRows(values)
    }

    const handleUpdateSelectedRowsKey =(values)=>{
      handleSetSelectedRowKeys(values)
    }

    const handleDelete=()=>{
        if(selectedRows.length > 0 ){
          dispatch(userRoleActions.setConfirmDelete(true))
        }else{
          MessageCommon.openNotificationError("Vui lòng chọn dữ liệu")
        }
    }

    const handleAdd=()=>{
      dispatch(userRoleActions.setModalAdd(true))
    }
  
    return (
      <>
        <div className={styles["tableContainer"]}>
            <div className={styles["table_heaader"]}>
                    <div className={styles["table_heaader_container"]}>
                        <div className={styles["table_title"]}>
                            <span id={styles["title_manage"]}>Quản lý vai trò người dùng</span>
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

            <div className={styles["table"]}>
                <TableData
                    columns={columns}
                    dataRow={userRoleList}
                    handleUpdateSelectedRows={handleUpdateSelectedRows}
                    selectedRows={selectedRows}
                    selectedRowKeysProp={selectedRowKeys}
                    handleUpdateSelectedRowsKey={handleUpdateSelectedRowsKey}
                />
            </div>
        </div>

        <div className={styles["table_pagination"]}>
             <PaginationData
               total = {totalData}
               handleChangePagination = {handleChangePagination}
             />
        </div>

      </>
    )
}
export default memo(UserRolesTable)
