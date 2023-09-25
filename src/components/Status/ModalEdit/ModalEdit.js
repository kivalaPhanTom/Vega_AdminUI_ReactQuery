import React,{useEffect, memo} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MethodCommon } from "../../../Common/methods";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AddEditModalLayout from '../AddEditModalLayout'
import { Service } from '../../../Services/Status/Status'
import { commonAlerError } from "../../../Common/error"
import { setConfirmEdit, handleAlertEditResultAction } from "../../../Redux/slices/Status.slice"
import { RESULT_STATUS } from "../../../Common/Common_Parameter"

function ModalEdit(props) {
    const dispatch = useDispatch();
    const isOpenConfirmEdit = useSelector((state)=> state.statusSlice.isOpenConfirmEdit)
    // const pagination = useSelector((state)=> state.statusSlice.pagination)
    const dataEdit = useSelector((state)=> state.statusSlice.dataEdit)
    const { id, code, name } = dataEdit
    // const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    const lang = ''
    const queryClient = useQueryClient()

    const editStatusMutation = useMutation({
        mutationFn: (data) => {
            return Service.editStatus(data)
        },
        onSuccess: async (res) => {
            if (res.data.result === RESULT_STATUS.SUCCESS) handleCloseModal()
            dispatch(handleAlertEditResultAction({
                signal: res.data.result,
                lang: ''
            }))
            queryClient.invalidateQueries(['status']) //để refresh lại api gọi danh sách
        },
        onError: () => {
            commonAlerError(lang)
        },
    })

    const handleOk = async (dataSubmit) => {
        let dataSubmitClone = { ...dataSubmit }
        dataSubmitClone.id = dataEdit.id
        dataSubmitClone.UpdatedDate = MethodCommon.getTimeStampNow()
        editStatusMutation.mutate(dataSubmitClone)
    }

    // const handleOk = () => {
    //     const dataSubmit ={
    //         id: id,
    //         statusId: code,
    //         statusName: name,
    //         UserUpdated: userLocalStorage.id,
    //         UpdatedDate:null
    //     }
    //     dispatch(statusActions.edit({data:dataSubmit, pagination:pagination}))
    // };

    // const handleCancel = () => {
    //     dispatch(statusActions.closeConfirmEdit({}))
    // };
    
    // const handleChangeCode =(e)=>{
    //     let dataClone = {...dataEdit}
    //     dataClone.code= e.target.value
    //     dispatch(statusActions.updateDataEdit(dataClone))
    // }

    // const handleChangeName =(e)=>{
    //     let dataClone = {...dataEdit}
    //     dataClone.name= e.target.value
    //     dispatch(statusActions.updateDataEdit(dataClone))
    // }
    const handleCloseModal = () => {
        dispatch(setConfirmEdit(false))
    }
    return (
        <>
        <AddEditModalLayout
            title={'Sửa trạng thái'}
            isOpen={isOpenConfirmEdit}
            handleOk={handleOk}
            handleCloseModal={handleCloseModal}
            codeState={code}
            nameState={name}
            isLoading={editStatusMutation.isLoading}
        />
            {/* <Modal 
                title={<span className={styles['title']}>Sửa trạng thái</span>} 
                open={isOpenConfirmEdit} 
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                        <button key="cancel" onClick={handleCancel} className={styles['btn_cancel']}>
                            Hủy
                        </button>,
                        <button key="submit" onClick={handleOk} className={styles['btn_submit']}>
                            Lưu
                        </button>,
                ]}
            >
                <div>
                    <div className={styles['nameAndIdMainGroup']}>
                        <div className={styles['id_field']}>
                            <span>Mã trạng thái</span>
                            <div>
                                <input value={code} onChange={handleChangeCode}></input>
                            </div>
                        </div>
                        <div className={styles['name_field']}>
                            <span>Tên trạng thái</span>
                            <div>
                                <input value={name} onChange={handleChangeName}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal> */}
        </>
    )
}


export default memo(ModalEdit)
