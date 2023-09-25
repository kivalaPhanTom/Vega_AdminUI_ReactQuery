/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styles from "./AddEditModalLayout.module.scss"
import { Input, Form } from 'antd';
import ModalPopup from '../../../commonComponent/ModalPopup/ModalPopup';
import { setLoading } from '../../../Redux/slices/Loading.slice'
import { useDispatch } from 'react-redux';

function AddEditModalLayout(props) {
  const { title, isOpen, handleCloseModal, handleOk, codeState, nameState, isLoading } = props
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true))
    } else {
      dispatch(setLoading(false))
    }
  }, [isLoading])

  useEffect(() => {
    form.setFieldsValue({
      statusCode: codeState,
      statusName: nameState,
    })
  }, [isOpen])

  const handleSubmitData = (data) => {
    const { statusCode, statusName } = data
    let dataSubmit = {
      statusCode,
      statusName
    }
    handleOk(dataSubmit)
  }

  const handleCancel = () => {
    handleCloseModal()
  }

  return (
    <ModalPopup
      title={title}
      isOpen={isOpen}
      handleOk={handleSubmitData}
      handleCancelData={handleCancel}
      form={form}
    >
      <div className={styles['modal']}>
        {/* USER_ROLE */}
        <div>
          <span>Mã trạng thái</span>
          <Form.Item
            name="statusCode"
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        {/* USER_NAME */}
        <div>
          <span>Tên trạng thái</span>
          <Form.Item
            name="statusName"
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
    </ModalPopup>
  )
}

export default AddEditModalLayout
