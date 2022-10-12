import React,{useState, useEffect, memo} from 'react'
import styles from "./index.module.css"
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as statusActions  from "../../../../Redux/Actions/Status.action";
import { MethodCommon } from "../../../../Common/methods";
import { Input } from 'antd';
import { Switch } from 'antd';
const { TextArea } = Input;
function ModalEdit(props) {
    const dispatch = useDispatch();
    const isOpenConfirmEdit = useSelector((state)=> state.statusSlice.isOpenConfirmEdit)
    const pagination = useSelector((state)=> state.statusSlice.pagination)
    const dataEdit = useSelector((state)=> state.statusSlice.dataEdit)
    const { id, code, name, isActive, note } = dataEdit
    // const [id, setID]= useState('')
    // const [name, setName] = useState('')
    // const [isActive, setIsActive] = useState(false)
    // const [note, setNote] = useState('')
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    useEffect(()=>{

    },[])

    const handleOk = () => {
        const dataSubmit ={
            id: id,
            mainGroupId: code,
            mainGroupName: name,
            mainGroupIsActive: isActive,
            mainGroupNote: note,
            UserUpdated: userLocalStorage.id,
            UpdatedDate:null
        }
        dispatch(statusActions.editStatus({data:dataSubmit, pagination:pagination}))
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

    const handleChangeIsActive =(value)=>{
        let dataClone = {...dataEdit}
        dataClone.isActive= value
        dispatch(statusActions.updateDataEdit(dataClone))
    }

    const handleChangeNote =(e)=>{
        let dataClone = {...dataEdit}
        dataClone.note = e.target.value
        dispatch(statusActions.updateDataEdit(dataClone))
    }

    return (
        <>
            <Modal 
                title={<span className={styles['title']}>Sửa nhóm hàng</span>} 
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
                            <span>Mã nhóm hàng</span>
                            <div>
                                <input value={code} onChange={handleChangeCode}></input>
                            </div>
                        </div>
                        <div className={styles['name_field']}>
                            <span>Tên nhóm hàng</span>
                            <div>
                                <input value={name} onChange={handleChangeName}></input>
                            </div>
                        </div>
                    </div>
                
                    
                    <div className={styles['status_field']}>
                        <span id= {styles['statusLabel']}>Trạng thái</span>
                        <div>
                        <Switch  className = {styles['switchBtn'] } checked={isActive} onChange={handleChangeIsActive} />
                        </div>
                    </div>
                    <div>
                        <span >Ghí chú</span>
                        <div>
                        <TextArea
                                value={note}
                                onChange={handleChangeNote}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}


export default memo(ModalEdit)
