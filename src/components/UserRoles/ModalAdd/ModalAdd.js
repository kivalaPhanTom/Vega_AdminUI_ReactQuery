import React,{useState, memo, useEffect} from 'react'
import styles from "./ModalAdd.module.scss"
import { Button, Modal, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as userRoleActions  from "../../../Redux/Actions/UserRole.action";
import { MethodCommon } from "../../../Common/methods";
import ModalPopup from '../../../commonComponent/ModalPopup/ModalPopup';
import {getTimeStampNow} from '../../../Common/Function/Function'
const { TextArea } = Input;

function ModalAdd(props) {
    const dispatch = useDispatch();
    // const isOpenAddMainGroup = useSelector((state)=> state.mainGroupSlice.isOpenAddMainGroup)
    const isOpenAddUserRole = useSelector((state)=> state.userRoleSlice.isOpenAddUserRole)
    // const data = useSelector((state)=> state.mainGroupSlice.data)
    const pagination = useSelector((state)=> state.userRoleSlice.pagination)
    const [codeState, setCodeState] = useState('')
    const [nameState, setNameState] = useState('')
    // const { code, name, isActive, note }= data
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')

    useEffect(()=>{
        resetData()
    },[isOpenAddUserRole])
    const handleOk = () => {
        // const dataSubmit ={
        //     mainGroupId: code,
        //     mainGroupName: name,
        //     mainGroupIsActive: isActive,
        //     mainGroupNote: note,
        //     UserCreated: userLocalStorage.id,
        //     UserUpdated: null,
        //     CreatedDate:null,
        //     UpdatedDate:null
        // }
        // dispatch(mainGroupActions.createMainGroup({data:dataSubmit, pagination:pagination }))
        console.log("codeState:",codeState)
        let data = {
            userRoleCode:codeState,
            userRoleName:nameState
        }
        data.CreatedDate = getTimeStampNow()
        dispatch(userRoleActions.create({data, pagination}))
    };

    const handleCancel = () => {
        dispatch(userRoleActions.setModalAdd(false))
    };
    
    const handleCancelData =()=>{
        // let dataClone = {...data}
        // dataClone.code = ''
        // dataClone.name = ''
        // dataClone.isActive = false
        // dataClone.note = ''
        // dispatch(mainGroupActions.closeModalAddMainGroup({}))
        // dispatch(mainGroupActions.updateDataInput(dataClone))
        dispatch(userRoleActions.setModalAdd(false))
        resetData()
        
    }
    const handleChangeCode =(e)=>{
        setCodeState(e.target.value)
    }
    const handleChangeName =(e)=>{
        setNameState(e.target.value)
    }
    const resetData=()=>{
        setCodeState('')
        setNameState('')
    }
    return (
        <>
        {/* <Modal 
            title={<span className={styles['title']}>Thêm nhóm hàng</span>} 
            open={isOpenAddMainGroup} 
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
            
            
        </Modal> */}
        <ModalPopup 
            title = {'Thêm vai trò'}
            isOpen = {isOpenAddUserRole}
            handleOk = {handleOk}
            handleCancel = {handleCancel}
            handleCancelData = {handleCancelData}
        >
            <div className={styles['modal']}>
                <div>
                    <span>Mã vai trò</span>
                    <div>
                        <Input className={styles['inputField']} value={codeState} onChange={handleChangeCode}></Input>
                    </div>
                </div>
                <div>
                    <span>Tên vai trò</span>
                    <div>
                        <Input className={styles['inputField']} value={nameState} onChange={handleChangeName}></Input>
                    </div>
                </div>
            </div>
        </ModalPopup>
        </>
    )
}


export default memo(ModalAdd)
