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
      roleCode: codeState,
      roleName: nameState,
    })
  }, [isOpen])

  const handleSubmitData = (data) => {
    const { roleCode, roleName } = data
    let dataSubmit = {
      userRoleCode: roleCode,
      userRoleName: roleName
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
          <span>Mã vai trò</span>
          <Form.Item
            name="roleCode"
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
          <span>Tên vai trò</span>
          <Form.Item
            name="roleName"
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
