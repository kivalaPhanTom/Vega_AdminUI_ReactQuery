import React,{useState, useEffect} from 'react'
import styles from "./css/index.module.css"
import UserRolesTable from './UserRolesTable/UserRolesTable';
import ModalAdd from './ModalAdd/ModalAdd';
import * as userRoleActions  from "../../Redux/Actions/UserRole.action";
import { useSelector, useDispatch } from 'react-redux';
import ModalEdit from './ModalEdit/ModalEdit';
import Search from './Search/Search';
import Filtering from './Filtering/Filtering';
import Notify from '../Notify/Notify';
import ConfirmDeleteUserRole from './ConfirmDeleteUserRole/ConfirmDeleteUserRole';

function UserRoles(props) {
  const dispatch = useDispatch();
  const pagination = useSelector((state)=> state.mainGroupSlice.pagination)
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keySearch, setKeySearch] = useState('')

  const handleSetSelectedRows =(value)=>{
    setSelectedRows(value)
  }
  const handleSetSelectedRowKeys =(value)=>{
    setSelectedRowKeys(value)
  }

  const handleDelete=()=>{
      let arrIdNeedDelete = []
      selectedRows.forEach((item)=>{
        arrIdNeedDelete.push(item._id)
      })
      dispatch(userRoleActions.deleteData({data:arrIdNeedDelete, pagination:pagination}))
  }

  return (
    <div className={styles["tableUserRole_area"]}>
         <div className={styles["search_and_notify"]}>
               <div className={styles["search_and_notify_container"]}>
                    <Search keySearch={keySearch} setKeySearch = {setKeySearch}/>
                    <Filtering/>
                    <ModalAdd/>
                    <div className={styles["notify"]}>
                         <Notify/>
                    </div>
               </div>
         </div>

         <div className={styles["table_maingroup"]}>
            <div className={styles["table_maingroup_container"]}>
                <UserRolesTable
                   selectedRows={selectedRows}
                   selectedRowKeys={selectedRowKeys}
                   handleSetSelectedRows={handleSetSelectedRows}
                   handleSetSelectedRowKeys={handleSetSelectedRowKeys}
                   keySearch = {keySearch}
                />
            </div>     
         </div>

         <ModalAdd/>
         <ModalEdit/>
         <ConfirmDeleteUserRole 
           handleDelete = {handleDelete}
         />
    </div>
  )
}

export default UserRoles
