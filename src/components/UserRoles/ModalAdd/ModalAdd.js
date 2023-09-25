/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MethodCommon } from "../../../Common/methods";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '../../../Services/UserRole/UserRole'
import { commonAlerError } from "../../../Common/error"
import { handleAlertAddResultAction, setModalAdd } from "../../../Redux/slices/UserRole.slice"
import AddEditModalLayout from '../AddEditModalLayout'
import { RESULT_STATUS } from "../../../Common/Common_Parameter"

function ModalAdd() {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const isOpenAddUserRole = useSelector((state) => state.userRoleSlice.isOpenAddUserRole)
    const lang = ''

    const createUserRoleMutation = useMutation({
        mutationFn: (data) => {
            return Service.createUserRole(data)
        },
        onSuccess: async (res) => {
            if (res.data.result === RESULT_STATUS.SUCCESS) handleCloseModal()
            dispatch(handleAlertAddResultAction({
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
        dispatch(setModalAdd(false))
    }
    const handleOk = async (dataSubmit) => {
        let dataSubmitClone = { ...dataSubmit }
        dataSubmitClone.CreatedDate = MethodCommon.getTimeStampNow()
        createUserRoleMutation.mutate(dataSubmitClone)
    }

    return (
        <AddEditModalLayout
            title={'Thêm vai trò'}
            isOpen={isOpenAddUserRole}
            handleOk={handleOk}
            handleCloseModal={handleCloseModal}
            codeState={''}
            nameState={''}
            isLoading={createUserRoleMutation.isLoading}
        />
    )
}


export default memo(ModalAdd)
