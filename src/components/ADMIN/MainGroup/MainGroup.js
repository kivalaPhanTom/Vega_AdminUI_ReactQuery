import React,{useState, useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import styles from "./css/index.module.css"
import MainGroupTable from './MainGroupTable/MainGroupTable';
import ModalAdd from './ModalAdd/ModalAdd';
import * as mainGroupActions  from "../../../Redux/Actions/MainGroup.action";
import { useSelector, useDispatch } from 'react-redux';
import ConfirmDeleteMainGroup from './ConfirmDeleteMainGroup/ConfirmDeleteMainGroup';

function MainGroup(props) {
  const dispatch = useDispatch();
  const {mainGroupList} = useSelector((state)=> state.mainGroupSlice)

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
      dispatch(mainGroupActions.deleteMainGroup({data:arrIdNeedDelete}))
  }

  useEffect(() => {
      dispatch(mainGroupActions.searchMainGroupBySocket({}))
  },[])

  return (
    <div className={styles["mainGroup_area"]}>
         <div className={styles["search_and_notify"]}>
               <div className={styles["search_and_notify_container"]}>
                     <div className={styles["search"]}>
                           <FiSearch className={styles["search_icon"]}/>
                           <input placeholder='Tìm kiếm' className={styles["search_input"]}/>
                     </div>
                     <div className={styles["notify"]}>
                         <FaBell/>
                    </div>
               </div>
         </div>

         <div className={styles["table_maingroup"]}>
            <div className={styles["table_maingroup_container"]}>
                <MainGroupTable
                   selectedRows={selectedRows}
                   selectedRowKeys={selectedRowKeys}
                   handleSetSelectedRows={handleSetSelectedRows}
                   handleSetSelectedRowKeys={handleSetSelectedRowKeys}
                />
            </div>     
         </div>

         <ModalAdd/>
         
         <ConfirmDeleteMainGroup
            handleDeleteMainGroup={handleDeleteMainGroup}
         />
    </div>
  )
}



export default MainGroup
