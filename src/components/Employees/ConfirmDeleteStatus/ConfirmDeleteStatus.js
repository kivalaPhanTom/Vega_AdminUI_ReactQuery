import React, {memo} from 'react'
import {Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./index.module.css"
import * as employeesActions  from "../../../Redux/Actions/Employees";

function ConfirmDeleteStatus(props) {
  
  const dispatch = useDispatch();
  const { handleDelete} = props
  const isOpenConfirmDelete = useSelector((state)=> state.employeesSlice.isOpenConfirmDelete)

  const handleOk = () => {
    handleDelete()
  };

  const handleCancel = () => {
    dispatch(employeesActions.setModalDelete(false))
  };

  return (
    <>
      <Modal 
          title={'Bạn muốn xóa ?'} 
          visible={isOpenConfirmDelete} 
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
      >
         <div className={styles['btn_action']}>
             <div className={styles['btnCancel']}>
                <button onClick={handleCancel}>Hủy</button>
             </div>
             <div className={styles['btnSave']}>
                <button onClick={handleOk}>Xóa</button>
             </div>
         </div>
      </Modal>
    </>
  )
}



export default ConfirmDeleteStatus