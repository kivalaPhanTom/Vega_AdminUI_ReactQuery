import React,{useState, memo} from 'react'
import { Button, Modal } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import * as mainGroupActions  from "../../../Redux/Actions/MainGroup.action";
// import { MethodCommon } from "../../../Common/methods";
import styles from './ModalPopup.module.scss'
import { AiOutlineClose } from "react-icons/ai";
// import { Input } from 'antd';
// import { Switch } from 'antd';
// const { TextArea } = Input;

function ModalPopup(props) {
    const {title, isOpen, handleOk, handleCancelData} = props
    // const dispatch = useDispatch();
    // const isOpenAddMainGroup = useSelector((state)=> state.mainGroupSlice.isOpenAddMainGroup)
    // const data = useSelector((state)=> state.mainGroupSlice.data)
    // const pagination = useSelector((state)=> state.mainGroupSlice.pagination)
    // const { code, name, isActive, note }= data
    // const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    
    // const handleOk = () => {
    //     const dataSubmit ={
    //         mainGroupId: code,
    //         mainGroupName: name,
    //         mainGroupIsActive: isActive,
    //         mainGroupNote: note,
    //         UserCreated: userLocalStorage.id,
    //         UserUpdated: null,
    //         CreatedDate:null,
    //         UpdatedDate:null
    //     }
    //     dispatch(mainGroupActions.createMainGroup({data:dataSubmit, pagination:pagination }))
    // };

    // const handleCancel = () => {
    //     dispatch(mainGroupActions.closeModalAddMainGroup({}))
    // };
    
    // const handleCancelData =()=>{
    //     let dataClone = {...data}
    //     dataClone.code = ''
    //     dataClone.name = ''
    //     dataClone.isActive = false
    //     dataClone.note = ''
    //     dispatch(mainGroupActions.closeModalAddMainGroup({}))
    //     dispatch(mainGroupActions.updateDataInput(dataClone))
    // }
    // const handleChangeCode =(e)=>{
    //     let dataClone = {...data}
    //     dataClone.code= e.target.value
    //     dispatch(mainGroupActions.updateDataInput(dataClone))
    // }
    // const handleChangeName =(e)=>{
    //     let dataClone = {...data}
    //     dataClone.name= e.target.value
    //     dispatch(mainGroupActions.updateDataInput(dataClone))
    // }
    // const handleChangeIsActive =(value)=>{
    //     let dataClone = {...data}
    //     dataClone.isActive= value
    //     dispatch(mainGroupActions.updateDataInput(dataClone))
    // }
    // const handleChangeNote =(e)=>{
    //     let dataClone = {...data}
    //     dataClone.note = e.target.value
    //     dispatch(mainGroupActions.updateDataInput(dataClone))
    // }

  return (
    <>
        <Modal 
          title={<span className={styles['title']}>{title}</span>} 
          open={isOpen} 
          onOk={handleOk}
          closeIcon = {<AiOutlineClose  onClick={handleCancelData}/>}
          footer={[
                <button key="cancel" onClick={handleCancelData} className={styles['btn_cancel']}>
                    Hủy
                </button>,
                <button key="submit" onClick={handleOk} className={styles['btn_submit']}>
                    Lưu
                </button>,
          ]}
        >
            {props.children}
        </Modal>
    </>
  )
}


export default memo(ModalPopup)
