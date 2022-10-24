import React, { useEffect, memo } from 'react';
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import styles from "./index.module.css"
import { useSelector, useDispatch } from 'react-redux';
import * as statusActions  from "../../../Redux/Actions/Status.action";
import TableData from '../../../commonComponent/TableData/TableData';
import { MethodCommon } from "../../../Common/methods";
import { FaPen, FaTrash } from "react-icons/fa";
import { MessageCommon } from "../../../Common/message";
import PaginationData from '../../../commonComponent/PaginationData/PaginationData';

function UserRolesTable(props) {

    const columns = [
      {
        title: 'Tên trạng thái',
        dataIndex: 'statusId',
      },
      {
        title: 'Mã trạng thái',
        dataIndex: 'statusName',
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
    const dispatch = useDispatch();
    const { selectedRows, selectedRowKeys, handleSetSelectedRows, handleSetSelectedRowKeys } =props
    const mainGroupList = useSelector((state)=> state.statusSlice.statusList)
    const totalData = useSelector((state)=> state.statusSlice.totalData)
    const pagination = useSelector((state)=> state.statusSlice.pagination)

    useEffect(() => {
      const dataSocket = {
        pageCurrent: pagination.pageCurrent,
        pageSize: pagination.pageSize,
        keySearch:''
      }
      dispatch(statusActions.searchBySocket(dataSocket))
    },[])
   
    const handleChangePagination =(page_index, page_size)=>{
      const data = {
        pageCurrent: page_index,
        pageSize: page_size,
        keySearch:''
      }
      dispatch(statusActions.updatePagination({
        pageCurrent: page_index,
        pageSize: page_size
      }))
      dispatch(statusActions.searchAndPaginationData(data))
    }

    const handleConfirmEditItem =(item)=>{
      const dataEdit = {
          id: item.id,
          code: item.statusId,
          name: item.statusName,
      }
      dispatch(statusActions.updateDataEdit(dataEdit))
      dispatch(statusActions.openConfirmEdit())
    }

    const handleConfirmDeleteItem=(item)=>{
      handleSetSelectedRows([item])
      dispatch(statusActions.openConfirmDelete())
    } 

    const handleUpdateSelectedRows =(values)=>{
      handleSetSelectedRows(values)
    }

    const handleUpdateSelectedRowsKey =(values)=>{
      handleSetSelectedRowKeys(values)
    }

    const handleDelete=()=>{
        if(selectedRows.length > 0 ){
          dispatch(statusActions.openConfirmDelete())
        }else{
          MessageCommon.openNotificationError("Vui lòng chọn dữ liệu")
        }
    }

    const handleAdd=()=>{
      dispatch(statusActions.setModalAdd(true))
    }
  
    return (
      <>
        <div className={styles["itemTable"]}>
            <div className={styles["table_heaader"]}>
                    <div className={styles["table_heaader_container"]}>
                        <div className={styles["table_title"]}>
                            <span id={styles["title_manage"]}>Quản lý trạng thái</span>
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
             <PaginationData
               total = {totalData}
               handleChangePagination = {handleChangePagination}
             />
        </div>

      </>
    )
}
export default memo(UserRolesTable)
