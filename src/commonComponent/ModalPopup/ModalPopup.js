import React, { memo } from 'react'
import { Modal, Form } from 'antd';
import styles from './ModalPopup.module.scss'
import { AiOutlineClose } from "react-icons/ai";

function ModalPopup(props) {
  const { title, isOpen, handleOk, handleCancelData, form } = props
  const handleCancel =()=>{
    form.resetFields()
    handleCancelData()
  }
  return (
    <>
      <Modal
        title={<span className={styles['title']}>{title}</span>}
        open={isOpen}
        onOk={() => form.submit()}
        closeIcon={<AiOutlineClose onClick={handleCancel} />}
        footer={[
          <button key="cancel" onClick={handleCancel} className={styles['btn_cancel']}>
            Hủy
          </button>,
          <button key="submit" onClick={() => form.submit()} className={styles['btn_submit']}>
            Lưu
          </button>,
        ]}
      >
        <Form
          form={form}
          name="basic"
          onFinish={handleOk}
          initialValues={{
            remember: false,
          }}
        >
          {props.children}
        </Form>
      </Modal>
    </>
  )
}

export default memo(ModalPopup)
