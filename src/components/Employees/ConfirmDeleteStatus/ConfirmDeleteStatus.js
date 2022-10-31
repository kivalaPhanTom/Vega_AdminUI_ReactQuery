import React, {memo} from 'react'
import {Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./index.module.css"
import * as statusActions  from "../../../Redux/Actions/Status.action";

function ConfirmDeleteStatus(props) {
  
  const dispatch = useDispatch();
  const { handleDeleteMainGroup} =props
  const isOpenConfirmDelete = useSelector((state)=> state.statusSlice.isOpenConfirmDelete)

  const handleOk = () => {
      handleDeleteMainGroup()
  };

  const handleCancel = () => {
    dispatch(statusActions.closeConfirmDelete())
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