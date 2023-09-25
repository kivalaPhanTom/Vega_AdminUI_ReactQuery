import React,{memo} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MethodCommon } from "../../../Common/methods"
import { setModalAdd, handleAlertAddResultAction } from "../../../Redux/slices/Status.slice"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AddEditModalLayout from '../AddEditModalLayout'
import { Service } from '../../../Services/Status/Status'
import { RESULT_STATUS } from "../../../Common/Common_Parameter"
import { commonAlerError } from "../../../Common/error"

function ModalAdd(props) {
    const dispatch = useDispatch();
    const isOpenAddStatus = useSelector((state)=> state.statusSlice.isOpenAddStatus)
    // const data = useSelector((state)=> state.statusSlice.data)
    // const pagination = useSelector((state)=> state.statusSlice.pagination)
    // const { code, name }= data
    // const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    const lang = ''
    const queryClient = useQueryClient()
    const createStatusMutation = useMutation({
        mutationFn: (data) => {
            return Service.createStatus(data)
        },
        onSuccess: async (res) => {
            if (res.data.result === RESULT_STATUS.SUCCESS) handleCloseModal()
            dispatch(handleAlertAddResultAction({
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
        dataSubmitClone.CreatedDate = MethodCommon.getTimeStampNow()
        createStatusMutation.mutate(dataSubmitClone)

        // const dataSubmit ={
        //     statusId: code,
        //     statusName: name,
        //     UserCreated: userLocalStorage.id,
        //     UserUpdated: null,
        //     CreatedDate:null,
        //     UpdatedDate:null
        // }
        // dispatch(statusActions.create({data:dataSubmit, pagination:pagination }))
    }

    const handleCloseModal = () => {
        dispatch(setModalAdd(false))
    }
    
    // const handleCancelData =()=>{
    //     let dataClone = {...data}
    //     dataClone.code = ''
    //     dataClone.name = ''
    //     dispatch(setModalAdd(false))
    //     dispatch(statusActions.updateDataInput(dataClone))
    // }
    // const handleChangeCode =(e)=>{
    //     let dataClone = {...data}
    //     dataClone.code= e.target.value
    //     dispatch(statusActions.updateDataInput(dataClone))
    // }
    // const handleChangeName =(e)=>{
    //     let dataClone = {...data}
    //     dataClone.name= e.target.value
    //     dispatch(statusActions.updateDataInput(dataClone))
    // }

  return (
    <>
      {/* <Modal 
          title={<span className={styles['title']}>Thêm trạng thái</span>} 
          open={isOpenAddStatus} 
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
                <button key="cancel" onClick={handleCancelData} className={styles['btn_cancel']}>
                    Hủy
                </button>,
                <button key="submit" onClick={handleOk} className={styles['btn_submit']}>
                    Lưu
                </button>,
          ]}
      >
        <div>
            <div className={styles['nameAndId']}>
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
      <AddEditModalLayout
            title={'Thêm trạng thái'}
            isOpen={isOpenAddStatus}
            handleOk={handleOk}
            handleCloseModal={handleCloseModal}
            codeState={''}
            nameState={''}
            isLoading={createStatusMutation.isLoading}
        />
    </>
  )
}


export default memo(ModalAdd)
