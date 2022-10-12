import React,{useState, useEffect} from 'react'
import styles from "./css/index.module.css"
import UserRolesTable from './StatusTable/StatusTable';
import ModalAdd from './ModalAdd/ModalAdd';
import * as statusActions  from "../../../Redux/Actions/Status.action";
import { useSelector, useDispatch } from 'react-redux';
import ConfirmDeleteStatus from './ConfirmDeleteStatus/ConfirmDeleteStatus';
import ModalEdit from './ModalEdit/ModalEdit';
import Search from './Search/Search';
import Filtering from './Filtering/Filtering';
import Notify from '../Notify/Notify';


function Status(props) {
  const dispatch = useDispatch();
  const pagination = useSelector((state)=> state.statusSlice.pagination)
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
      dispatch(statusActions.deleteStatus({data:arrIdNeedDelete, pagination:pagination}))
  }

  return (
    <div className={styles["Status_area"]}>
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
         <ConfirmDeleteStatus
            handleDeleteMainGroup={handleDeleteMainGroup}
         />
    </div>
  )
}

export default Status
