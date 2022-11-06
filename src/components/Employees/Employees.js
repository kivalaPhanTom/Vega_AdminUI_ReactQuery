import React,{useState} from 'react'
import styles from "./css/index.module.css"
import EmployeesTable from './EmployeesTable/EmployeesTable';
import ModalAdd from './ModalAdd/ModalAdd';
import * as employeesActions  from "../../Redux/Actions/Employees";
import { useSelector, useDispatch } from 'react-redux';
import ConfirmDeleteStatus from './ConfirmDeleteStatus/ConfirmDeleteStatus';
import ModalEdit from './ModalEdit/ModalEdit';
import Search from './Search/Search';
import Filtering from './Filtering/Filtering';
import Notify from '../Notify/Notify';
import UploadImage from '../../commonComponent/UploadImage/UploadImage';


function Employees(props) {
  const dispatch = useDispatch();
  const pagination = useSelector((state)=> state.employeesSlice.pagination)
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const handleSetSelectedRows =(value)=>{
    setSelectedRows(value)
  }
  const handleSetSelectedRowKeys =(value)=>{
    setSelectedRowKeys(value)
  }

  const handleDelete=()=>{
      let arrIdNeedDelete = []
      let arrPulicIdImageCloudinary = []
      selectedRows.forEach((item)=>{
        arrIdNeedDelete.push(item._id)
        arrPulicIdImageCloudinary.push(item.Avatar.publicID)
      })
      dispatch(employeesActions.deleteData({data:arrIdNeedDelete, dataImg:arrPulicIdImageCloudinary, pagination:pagination}))
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

         <div className={styles["table_area"]}>
            <div className={styles["table_area_container"]}>
                <EmployeesTable
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
            handleDelete={handleDelete}
         />
    </div>
  )
}

export default Employees
