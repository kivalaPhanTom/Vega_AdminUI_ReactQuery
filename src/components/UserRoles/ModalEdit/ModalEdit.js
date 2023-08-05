/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MethodCommon } from "../../../Common/methods"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commonAlerError } from "../../../Common/error"
import AddEditModalLayout from '../AddEditModalLayout'
import { RESULT_STATUS } from "../../../Common/Common_Parameter"
import { Service } from '../../../Services/UserRole/UserRole'
import { handleAlertEditResultAction, setConfirmEdit } from "../../../Redux/slices/UserRole.slice"

function ModalEdit() {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const isOpenConfirmEdit = useSelector((state) => state.userRoleSlice.isOpenConfirmEdit)
    const dataEdit = useSelector((state) => state.userRoleSlice.dataEdit)
    const lang = ''
    const editUserRoleMutation = useMutation({
        mutationFn: (data) => {
            return Service.editUserRole(data)
        },
        onSuccess: async (res) => {
            if (res.data.result === RESULT_STATUS.SUCCESS) handleCloseModal()
            dispatch(handleAlertEditResultAction({
                signal: res.data.result,
                lang: ''
            }))
            queryClient.invalidateQueries(['userRoles']) //để refresh lại api gọi danh sách
        },
        onError: () => {
            commonAlerError(lang)
        },
    })

    const handleCloseModal = () => {
        dispatch(setConfirmEdit(false))
    }

    const handleOk = async (dataSubmit) => {
        let dataSubmitClone = { ...dataSubmit }
        dataSubmitClone.id = dataEdit.id
        dataSubmitClone.UpdatedDate = MethodCommon.getTimeStampNow()
        editUserRoleMutation.mutate(dataSubmitClone)
    }

    return (
        <AddEditModalLayout
            title={'Sửa vai trò'}
            isOpen={isOpenConfirmEdit}
            handleOk={handleOk}
            handleCloseModal={handleCloseModal}
            codeState={dataEdit.userRoleCode}
            nameState={dataEdit.userRoleName}
            isLoading={editUserRoleMutation.isLoading}
        />
    )
}

export default memo(ModalEdit)
