import React, {memo} from 'react'
import {Modal } from 'antd';
import styles from './ConfirmDelete.module.scss'

function ConfirmDelete(props) {
    const {handleOk, handleCancel, isOpen} = props
    return (
        <Modal 
            title={'Bạn muốn xóa ?'} 
            open={isOpen} 
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
    )
}


export default ConfirmDelete
