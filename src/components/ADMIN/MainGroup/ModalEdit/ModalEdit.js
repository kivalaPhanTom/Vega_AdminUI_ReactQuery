import React,{useState} from 'react'
import styles from "./index.module.css"
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as mainGroupActions  from "../../../../Redux/Actions/MainGroup.action";
import { MethodCommon } from "../../../../Common/methods";
import { Input } from 'antd';
import { Switch } from 'antd';
const { TextArea } = Input;
function ModalEdit(props) {
    const dispatch = useDispatch();
    const {isOpenAddMainGroup,data} = useSelector((state)=> state.mainGroupSlice)
    const { code, name, isActive, note }= data
    // const [id, setID]= useState('')
    // const [name, setName] = useState('')
    // const [isActive, setIsActive] = useState(false)
    // const [note, setNote] = useState('')
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    const handleOk = () => {
        const dataSubmit ={
            mainGroupId: code,
            mainGroupName: name,
            mainGroupIsActive: isActive,
            mainGroupNote: note,
            UserCreated: userLocalStorage.id,
            UserUpdated: null,
            CreatedDate:null,
            UpdatedDate:null
        }
        dispatch(mainGroupActions.createMainGroup({data:dataSubmit}))
    };

    const handleCancel = () => {
        dispatch(mainGroupActions.closeModalAddMainGroup({}))
    };
    const handleChangeCode =(e)=>{
        let dataClone = {...data}
        dataClone.code= e.target.value
        dispatch(mainGroupActions.updateDataInput(dataClone))
    }
    const handleChangeName =(e)=>{
        let dataClone = {...data}
        dataClone.name= e.target.value
        dispatch(mainGroupActions.updateDataInput(dataClone))
    }
    const handleChangeIsActive =(value)=>{
        let dataClone = {...data}
        dataClone.isActive= value
        dispatch(mainGroupActions.updateDataInput(dataClone))
    }
    const handleChangeNote =(e)=>{
        let dataClone = {...data}
        dataClone.note = e.target.value
        dispatch(mainGroupActions.updateDataInput(dataClone))
    }

  return (
    <>
      <Modal 
          title={<span className={styles['title']}>Thêm nhóm hàng</span>} 
          visible={isOpenAddMainGroup} 
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
                        // placeholder="Controlled autosize"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                 </div>
            </div>
        </div>
        
        
      </Modal>
    </>
  )
}


export default ModalEdit
