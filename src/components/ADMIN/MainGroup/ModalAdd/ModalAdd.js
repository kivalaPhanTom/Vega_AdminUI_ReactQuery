import React,{useState} from 'react'
import styles from "./css/index.module.css"
import { Button, Modal } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// // import * as mainGroupActions  from "../../Redux/Actions/Login.action";
// import * as mainGroupActions  from "../../Redux/Actions/Login.action";
import { useSelector, useDispatch } from 'react-redux';
import * as mainGroupActions  from "../../../../Redux/Actions/MainGroup.action";
// import { MethodCommon } from "../../Common/methods";
import { MethodCommon } from "../../../Common/methods";
import { Input } from 'antd';
import { Switch } from 'antd';
const { TextArea } = Input;
function ModalAdd(props) {
    const dispatch = useDispatch();
    const {isOpenAddMainGroup} = useSelector((state)=> state.mainGroupSlice)
    const [id, setID]= useState('')
    const [name, setName] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [note, setNote] = useState('')
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    console.log("userLocalStorage:",userLocalStorage )
    const handleOk = () => {
        // setIsModalVisible(false);
        const data ={
            mainGroupId: id,
            mainGroupName: name,
            mainGroupIsActive: isActive,
            mainGroupNote: note,
            UserCreated: userLocalStorage.id,
            UserUpdated: null,
            CreatedDate:null,
            UpdatedDate:null
        }
        dispatch(mainGroupActions.createMainGroup({data:data}))
    };

    const handleCancel = () => {
        dispatch(mainGroupActions.closeModalAddMainGroup({}))
    };
    const handleChangeID =(e)=>{
        console.log("e.target.value:",e.target.value)
        setID(e.target.value)
    }
    const handleChangeName =(e)=>{
        setName(e.target.value)
    }
    const handleChangeIsActive =(value)=>{
        setIsActive(value)
    }
    const handleChangeNote =(e)=>{
        setNote(e.target.value)
    }
// const onChange = (checked) => {
    
//     console.log(`switch to ${checked}`);
//   };
  return (
    <>
      <Modal 
          title="Thêm nhóm hàng" 
          visible={isOpenAddMainGroup} 
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText={"Hủy"}
          okText={"Lưu"}
      >
        <div>
            <div className={styles['nameAndIdMainGroup']}>
                <div className={styles['id_field']}>
                    <span>Mã nhóm hàng</span>
                    <div>
                        <input value={id} onChange={handleChangeID}></input>
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
                 <span>Trạng thái</span>
                 <div>
                   <Switch checked={isActive} onChange={handleChangeIsActive} />
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


export default ModalAdd
