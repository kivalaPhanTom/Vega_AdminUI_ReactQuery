import React, { useEffect, memo } from 'react';
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import styles from "./index.module.css"
import { useSelector, useDispatch } from 'react-redux';
import * as employeesActions  from "../../../Redux/Actions/Employees";
import TableData from '../../../commonComponent/TableData/TableData';
import { MethodCommon } from "../../../Common/methods";
import { FaPen, FaTrash } from "react-icons/fa";
import { MessageCommon } from "../../../Common/message";
import PaginationData from '../../../commonComponent/PaginationData/PaginationData';

function EmployeesTable(props) {

    const columns = [
      {
        title: 'Mã nhân viên',
        dataIndex: 'employeeID',
      },
      {
        title: 'Tên nhân viên',
        dataIndex: 'user_name',
      },
      {
        title: 'Vai trò',
        dataIndex: 'Role',
        render: (data) => {
          let result = ''
          if(data === 0)
          {
            result = "Admin"
          }
          return <span>{result}</span>
        }
      },
      {
        title: 'Email',
        dataIndex: 'user_email',
      },
      {
        title: 'Ngày sinh',
        dataIndex: 'birthDate',
        render: (data) => {
          return <span>{MethodCommon.converTimeStampToDate(data)}</span>
        }
      },
      {
        title: 'CMND/CCCD',
        dataIndex: 'CMND',
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
      },
      {
        title: 'Ngày vào làm',
        dataIndex: 'workingDay',
        render: (data) => {
          return <span>{MethodCommon.converTimeStampToDate(data)}</span>
        }
      },
      {
        title: 'Ngày kết thúc làm',
        dataIndex: 'stopWorkingDay',
        render: (data) => {
          return <span>{MethodCommon.converTimeStampToDate(data)}</span>
        }
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
      },
      {
        title: 'Trụ sở làm việc',
        dataIndex: 'workingAddress',
      },
      // {
      //   title: 'Người tạo',
      //   render: (data) => {
      //     let userCreateResult = <></>
      //     if( data.UserCreated !== null){
      //           const {UserCreated_Object} = data
      //           userCreateResult = <span>{UserCreated_Object !== null ? UserCreated_Object.user_name :""}</span>
      //     }
      //     return userCreateResult
      //   }
      // },
      // {
      //   title: 'Ngày tạo',
      //   dataIndex: 'CreatedDate',
      //   render: (createdDate) => {
      //       let createdDateResult = <></>
      //       if( createdDate !== null){
      //         createdDateResult = <span>{MethodCommon.formatTime(createdDate)}</span>
      //       }
      //       return createdDateResult
      //   }
      // },
      // {
      //   title: 'Người cập nhật',
      //   render: (data) => {
      //     let userUpdateResult = <></>
      //     if( data.UserUpdated !== null){
      //           const {UserUpdated_Object} = data
      //           userUpdateResult = <p>{UserUpdated_Object !== null ? UserUpdated_Object.user_name : ""}</p>
      //     }
      //     return userUpdateResult
      //   }
      // },
      // {
      //   title: 'Ngày cập nhật',
      //   dataIndex: 'UpdatedDate',
      //   render: (UpdatedDate) => {
      //       let updatedDateResult = <></>
      //       if( UpdatedDate !== null){
      //         updatedDateResult = <span>{MethodCommon.formatTime(UpdatedDate)}</span>
      //       }
      //       return updatedDateResult
      //   }
      // },
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
    const { selectedRows, selectedRowKeys, handleSetSelectedRows, handleSetSelectedRowKeys } = props
    const employeesList = useSelector((state)=> state.employeesSlice.employeesList)
    const totalData = useSelector((state)=> state.employeesSlice.totalData)
    const pagination = useSelector((state)=> state.employeesSlice.pagination)

    useEffect(() => {
      const dataSocket = {
        pageCurrent: pagination.pageCurrent,
        pageSize: pagination.pageSize,
        keySearch:''
      }
      dispatch(employeesActions.searchBySocket(dataSocket))
    },[])
   
    const handleChangePagination =(page_index, page_size)=>{
      const data = {
        pageCurrent: page_index,
        pageSize: page_size,
        keySearch:''
      }
      dispatch(employeesActions.updatePagination({
        pageCurrent: page_index,
        pageSize: page_size
      }))
      dispatch(employeesActions.searchAndPaginationData(data))
    }

    const handleConfirmEditItem =(item)=>{
      const dataEdit = {
          id: item.id,
          employeeID: item.employeeID,
          user_name:item.user_name,
          Role:item.Role,
          birthDate:item.birthDate,
          address:item.address,
          CMND:item.CMND,
          phone:item.phone,
          workingAddress:item.workingAddress,
          user_password:item.user_password,
          user_email:item.user_email,
          keysearch:item.keysearch,
          Avatar:item.Avatar,
          status:item.status,
          workingDay:item.workingDay,
          stopWorkingDay:item.stopWorkingDay,
      }
      dispatch(employeesActions.updateDataEdit(dataEdit))
      dispatch(employeesActions.cacheDataEdit(dataEdit))
      dispatch(employeesActions.setModalEdit(true))
    }

    const handleConfirmDeleteItem=(item)=>{
      handleSetSelectedRows([item])
      dispatch(employeesActions.setModalDelete(true))
    } 

    const handleUpdateSelectedRows =(values)=>{
      handleSetSelectedRows(values)
    }

    const handleUpdateSelectedRowsKey =(values)=>{
      handleSetSelectedRowKeys(values)
    }

    const handleDelete=()=>{
        if(selectedRows.length > 0 ){
          dispatch(employeesActions.setModalDelete(true))
        }else{
          MessageCommon.openNotificationError("Vui lòng chọn dữ liệu")
        }
    }

    const handleAdd=()=>{
      dispatch(employeesActions.setModalAdd(true))
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
                    dataRow={employeesList}
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
export default memo(EmployeesTable)
