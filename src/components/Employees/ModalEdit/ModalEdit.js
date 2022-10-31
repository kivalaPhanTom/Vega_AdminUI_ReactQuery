import React,{useEffect, memo} from 'react'
import styles from "./index.module.css"
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as statusActions  from "../../../Redux/Actions/Status.action";
import { MethodCommon } from "../../../Common/methods";

function ModalEdit(props) {
    const dispatch = useDispatch();
    const isOpenConfirmEdit = useSelector((state)=> state.statusSlice.isOpenConfirmEdit)
    const pagination = useSelector((state)=> state.statusSlice.pagination)
    const dataEdit = useSelector((state)=> state.statusSlice.dataEdit)
    const { id, code, name } = dataEdit
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    useEffect(()=>{

    },[])

    const handleOk = () => {
        const dataSubmit ={
            id: id,
            statusId: code,
            statusName: name,
            UserUpdated: userLocalStorage.id,
            UpdatedDate:null
        }
        dispatch(statusActions.edit({data:dataSubmit, pagination:pagination}))
    };

    const handleCancel = () => {
        dispatch(statusActions.closeConfirmEdit({}))
    };
    
    const handleChangeCode =(e)=>{
        let dataClone = {...dataEdit}
        dataClone.code= e.target.value
        dispatch(statusActions.updateDataEdit(dataClone))
    }

    const handleChangeName =(e)=>{
        let dataClone = {...dataEdit}
        dataClone.name= e.target.value
        dispatch(statusActions.updateDataEdit(dataClone))
    }

    return (
        <>
            <Modal 
                title={<span className={styles['title']}>Sửa trạng thái</span>} 
                visible={isOpenConfirmEdit} 
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
            </Modal>
        </>
    )
}


export default memo(ModalEdit)
