import React,{useState, memo, useEffect} from 'react'
import styles from "./ModalEdit.module.scss"
import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as userRoleActions  from "../../../Redux/Actions/UserRole.action";
import { MethodCommon } from "../../../Common/methods";
import ModalPopup from '../../../commonComponent/ModalPopup/ModalPopup';

function ModalEdit(props) {
    const dispatch = useDispatch();
    const isOpenConfirmEdit = useSelector((state)=> state.userRoleSlice.isOpenConfirmEdit)
    const dataEdit = useSelector((state)=> state.userRoleSlice.dataEdit)
    const pagination = useSelector((state)=> state.userRoleSlice.pagination)
    const [codeState, setCodeState] = useState(dataEdit.userRoleCode)
    const [nameState, setNameState] = useState(dataEdit.userRoleName)
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')

    useEffect(()=>{
        setCodeState(dataEdit.userRoleCode)
        setNameState(dataEdit.userRoleName)
    },[isOpenConfirmEdit])

    const handleOk = () => {
        let data = {
            id: dataEdit.id,
            userRoleCode:codeState,
            userRoleName:nameState
        }
        data.UpdatedDate = MethodCommon.getTimeStampNow()
        dispatch(userRoleActions.edit({data, pagination}))
    };
    
    const handleCancelData =()=>{
        dispatch(userRoleActions.setConfirmEdit(false))
    }
    const handleChangeCode =(e)=>{
        setCodeState(e.target.value)
    }
    const handleChangeName =(e)=>{
        setNameState(e.target.value)
    }

    return (
        <ModalPopup 
            title = {'Sửa vai trò'}
            isOpen = {isOpenConfirmEdit}
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


export default memo(ModalEdit)
