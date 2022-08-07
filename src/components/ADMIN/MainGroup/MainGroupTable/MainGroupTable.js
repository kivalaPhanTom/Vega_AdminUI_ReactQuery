import React, { useEffect } from 'react';
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import styles from "./index.module.css"
import { useSelector, useDispatch } from 'react-redux';
import * as mainGroupActions  from "../../../../Redux/Actions/MainGroup.action";
import TableData from '../../../../commonComponent/TableData/TableData';
import { MethodCommon } from "../../../../Common/methods";
import { FaPen, FaTrash } from "react-icons/fa";
import { MessageCommon } from "../../../../Common/message";
import PaginationData from '../../../../commonComponent/PaginationData/PaginationData';
  
function MainGroupTable(props) {

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
              createdDateResult = <p>{MethodCommon.formatTime(createdDate)}</p>
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
              updatedDateResult = <p>{MethodCommon.formatTime(UpdatedDate)}</p>
            }
            return updatedDateResult
        }
      },
      {
        title: 'Hành động',
        render: (item) => {
          return(
            <div className={styles['icon_actions']}>
              <FaPen className={styles['icon_edit']}/>
              <FaTrash onClick = {()=>handleConfirmDeleteItem(item)}className={styles['icon_delete']}/>
            </div>
          )
        },
      },
    ];
    const dispatch = useDispatch();
    const { selectedRows, selectedRowKeys, handleSetSelectedRows, handleSetSelectedRowKeys } =props
    const {mainGroupList} = useSelector((state)=> state.mainGroupSlice)

    useEffect(() => {
      dispatch(mainGroupActions.searchMainGroup({}))
    },[])

    const handleConfirmDeleteItem=(item)=>{
      handleSetSelectedRows([item])
      dispatch(mainGroupActions.openConfirmDelete())
    } 

    const handleUpdateSelectedRows =(values)=>{
      handleSetSelectedRows(values)
    }

    const handleUpdateSelectedRowsKey =(values)=>{
      handleSetSelectedRowKeys(values)
    }

    const handleDelete=()=>{
        if(selectedRows.length > 0 ){
          dispatch(mainGroupActions.openConfirmDelete())
        }else{
          MessageCommon.openNotificationError("Vui lòng chọn dữ liệu")
        }
    }

    const handleAdd=()=>{
      dispatch(mainGroupActions.openModalAddMainGroup({}))
    }
    
    return (
      <>
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

          <div className={styles["table"]}>
              <TableData
                  columns={columns}
                  dataRow={mainGroupList}
                  handleUpdateSelectedRows={handleUpdateSelectedRows}
                  selectedRows={selectedRows}
                  selectedRowKeysProp={selectedRowKeys}
                  handleUpdateSelectedRowsKey={handleUpdateSelectedRowsKey}
              />
          </div>
        
          
        
      </div>
      <div className={styles["table_pagination"]}>
             <PaginationData/>
          </div>
      </>
    )
}
export default MainGroupTable
