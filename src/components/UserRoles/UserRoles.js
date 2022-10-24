import React,{useState, useEffect} from 'react'
import styles from "./css/index.module.css"
import UserRolesTable from './UserRolesTable/UserRolesTable';
import ModalAdd from './ModalAdd/ModalAdd';
import * as mainGroupActions  from "../../Redux/Actions/MainGroup.action";
import { useSelector, useDispatch } from 'react-redux';
import ConfirmDeleteMainGroup from './ConfirmDeleteMainGroup/ConfirmDeleteMainGroup';
import ModalEdit from './ModalEdit/ModalEdit';
import Search from './Search/Search';
import Filtering from './Filtering/Filtering';
import Notify from '../Notify/Notify';


function UserRoles(props) {
  const dispatch = useDispatch();
  const pagination = useSelector((state)=> state.mainGroupSlice.pagination)
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const handleSetSelectedRows =(value)=>{
    setSelectedRows(value)
  }
  const handleSetSelectedRowKeys =(value)=>{
    setSelectedRowKeys(value)
  }

  const handleDeleteMainGroup=()=>{
      let arrIdNeedDelete = []
      selectedRows.forEach((item)=>{
        arrIdNeedDelete.push(item._id)
      })
      dispatch(mainGroupActions.deleteMainGroup({data:arrIdNeedDelete, pagination:pagination}))
  }

  return (
    <div className={styles["tableUserRole_area"]}>
         <div className={styles["search_and_notify"]}>
               <div className={styles["search_and_notify_container"]}>
                    <Search/>
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
                />
            </div>     
         </div>

         <ModalAdd/>
         <ModalEdit/>
         <ConfirmDeleteMainGroup
            handleDeleteMainGroup={handleDeleteMainGroup}
         />
    </div>
  )
}

export default UserRoles
