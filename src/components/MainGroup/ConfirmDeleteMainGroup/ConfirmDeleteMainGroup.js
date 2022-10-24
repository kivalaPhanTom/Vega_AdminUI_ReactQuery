import React, {memo} from 'react'
import {Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./index.module.css"
import * as mainGroupActions  from "../../../Redux/Actions/MainGroup.action";
function ConfirmDeleteMainGroup(props) {
  
  const dispatch = useDispatch();
  const { handleDeleteMainGroup} =props
  const isOpenConfirmDelete = useSelector((state)=> state.mainGroupSlice.isOpenConfirmDelete)

  const handleOk = () => {
      handleDeleteMainGroup()
  };

  const handleCancel = () => {
    dispatch(mainGroupActions.closeConfirmDelete())
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



export default ConfirmDeleteMainGroup
