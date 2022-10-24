import React,{memo} from 'react'
import styles from "./index.module.css"
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as statusActions  from "../../../Redux/Actions/Status.action";
import { MethodCommon } from "../../../Common/methods";

function ModalAdd(props) {
    const dispatch = useDispatch();
    const isOpenAddStatus = useSelector((state)=> state.statusSlice.isOpenAddStatus)
    const data = useSelector((state)=> state.statusSlice.data)
    const pagination = useSelector((state)=> state.statusSlice.pagination)
    const { code, name }= data
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    
    const handleOk = () => {
        const dataSubmit ={
            statusId: code,
            statusName: name,
            UserCreated: userLocalStorage.id,
            UserUpdated: null,
            CreatedDate:null,
            UpdatedDate:null
        }
        dispatch(statusActions.create({data:dataSubmit, pagination:pagination }))
    };

    const handleCancel = () => {
        dispatch(statusActions.setModalAdd(false))
    };
    
    const handleCancelData =()=>{
        let dataClone = {...data}
        dataClone.code = ''
        dataClone.name = ''
        dispatch(statusActions.setModalAdd(false))
        dispatch(statusActions.updateDataInput(dataClone))
    }
    const handleChangeCode =(e)=>{
        let dataClone = {...data}
        dataClone.code= e.target.value
        dispatch(statusActions.updateDataInput(dataClone))
    }
    const handleChangeName =(e)=>{
        let dataClone = {...data}
        dataClone.name= e.target.value
        dispatch(statusActions.updateDataInput(dataClone))
    }

  return (
    <>
      <Modal 
          title={<span className={styles['title']}>Thêm trạng thái</span>} 
          visible={isOpenAddStatus} 
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
      </Modal>
    </>
  )
}


export default memo(ModalAdd)
