import React,{useState, memo, useEffect} from 'react'
import styles from "./ModalAdd.module.scss"
import {Input } from 'antd';
import {useSelector, useDispatch } from 'react-redux';
import * as userRoleActions  from "../../../Redux/Actions/UserRole.action";
import { MethodCommon } from "../../../Common/methods";
import ModalPopup from '../../../commonComponent/ModalPopup/ModalPopup';

function ModalAdd(props) {
    const dispatch = useDispatch();
    const isOpenAddUserRole = useSelector((state)=> state.userRoleSlice.isOpenAddUserRole)
    const pagination = useSelector((state)=> state.userRoleSlice.pagination)
    const [codeState, setCodeState] = useState('')
    const [nameState, setNameState] = useState('')
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')

    const handleOk = async() => {
        let data = {
            userRoleCode:codeState,
            userRoleName:nameState
        }
        data.CreatedDate = MethodCommon.getTimeStampNow()
        dispatch(userRoleActions.create({data, pagination}))  
    };
    
    const handleCancelData =()=>{
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
        <ModalPopup 
            title = {'Thêm vai trò'}
            isOpen = {isOpenAddUserRole}
            handleOk = {handleOk}
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
    )
}


export default memo(ModalAdd)
