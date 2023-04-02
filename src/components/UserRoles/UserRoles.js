import React,{useState, useEffect} from 'react'
import styles from "./css/index.module.css"
import ModalAdd from './ModalAdd/ModalAdd';
import * as userRoleActions  from "../../Redux/Actions/UserRole.action";
import { useSelector, useDispatch } from 'react-redux';
import ModalEdit from './ModalEdit/ModalEdit';
import ConfirmDeleteUserRole from './ConfirmDeleteUserRole/ConfirmDeleteUserRole';
import MainContain from '../LayoutAdmin/MainContain/MainContain';
import { MethodCommon } from "../../Common/methods";
import { FaPen, FaTrash } from "react-icons/fa";
import { PAGINATION_DEFAULT } from "../../Common/Common_Parameter";
import { MessageCommon } from "../../Common/message";

function UserRoles(props) {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keySearch, setKeySearch] = useState('')

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
 
  const handleSetSelectedRows =(value)=>{
    setSelectedRows(value)
  }
  const handleSetSelectedRowKeys =(value)=>{
    setSelectedRowKeys(value)
  }

  const handleConfirmDelete=()=>{
      let arrIdNeedDelete = []
      selectedRows.forEach((item)=>{
        arrIdNeedDelete.push(item._id)
      })
      dispatch(userRoleActions.deleteData({data:arrIdNeedDelete, pagination:pagination}))
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

  const handleSubmitSearch =()=>{
    handleChangePagination(PAGINATION_DEFAULT.pageCurrent, PAGINATION_DEFAULT.pageSize)
  }

  const handleChangePagination =(page_index, page_size)=>{
    const data = {
      pageCurrent: page_index,
      pageSize: page_size,
      keySearch: keySearch
    }
    dispatch(userRoleActions.updatePagination({
      pageCurrent: page_index,
      pageSize: page_size
    }))
    dispatch(userRoleActions.searchAndPaginationData(data))   
  }

  const handlSetConfirmDelete=()=>{
    if(selectedRows.length > 0 ){
      dispatch(userRoleActions.setConfirmDelete(true))
    }else{
      MessageCommon.openNotificationError("Vui lòng chọn dữ liệu")
    }
  }

  const setOpenModalAdd=()=>{
      dispatch(userRoleActions.setModalAdd(true))
  }
  return (
    <>
      <MainContain
        title = {'Quản lý vai trò người dùng'}
        columns = {columns}
        dataRow = {userRoleList}
        selectedRows = {selectedRows}
        setSelectedRows = {handleSetSelectedRows}
        selectedRowKeys = {selectedRowKeys}
        setSelectedRowKeys = {handleSetSelectedRowKeys}
        keySearch = {keySearch}
        setKeySearch = {setKeySearch}
        totalData = {totalData}
        handleSubmitSearch = {handleSubmitSearch}
        handleChangePagination = {handleChangePagination}
        handlSetConfirmDelete = {handlSetConfirmDelete}
        setOpenModalAdd = {setOpenModalAdd}
      />
      <ModalAdd/>
      <ModalEdit/>
      <ConfirmDeleteUserRole 
           handleConfirmDelete = {handleConfirmDelete}
      />
    </>
   
    // <div className={styles["tableUserRole_area"]}>
    //      <div className={styles["search_and_notify"]}>
    //            <div className={styles["search_and_notify_container"]}>
    //                 <Search keySearch={keySearch} setKeySearch = {setKeySearch}/>
    //                 <Filtering/>
    //                 <ModalAdd/>
    //                 <div className={styles["notify"]}>
    //                      <Notify/>
    //                 </div>
    //            </div>
    //      </div>

    //      <div className={styles["table_maingroup"]}>
    //         <div className={styles["table_maingroup_container"]}>
    //             <UserRolesTable
    //                selectedRows={selectedRows}
    //                selectedRowKeys={selectedRowKeys}
    //                handleSetSelectedRows={handleSetSelectedRows}
    //                handleSetSelectedRowKeys={handleSetSelectedRowKeys}
    //                keySearch = {keySearch}
    //             />
    //         </div>     
    //      </div>

    //      <ModalAdd/>
    //      <ModalEdit/>
    //      <ConfirmDeleteUserRole 
    //        handleDelete = {handleDelete}
    //      />
    // </div>
  )
}

export default UserRoles
