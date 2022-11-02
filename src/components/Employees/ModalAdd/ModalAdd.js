import React,{useState, memo} from 'react'
import styles from "./index.module.css"
import { useSelector, useDispatch } from 'react-redux';
import * as employeesActions  from "../../../Redux/Actions/Employees";
import { MethodCommon } from "../../../Common/methods";
import { Input, DatePicker, Modal } from 'antd';
import { FORMAT_DATE } from "../../../Common/Common_Parameter";
import { MessageCommon } from "../../../Common/message";
import moment from 'moment';
import UploadImage from '../../../commonComponent/UploadImage/UploadImage';

function ModalAdd(props) {
    const dispatch = useDispatch();
    const isOpenAdd = useSelector((state)=> state.employeesSlice.isOpenAdd)
    const data = useSelector((state)=> state.employeesSlice.data)
    console.log("data:",data)
    const pagination = useSelector((state)=> state.employeesSlice.pagination)
    const { employeeID, user_name, Role, birthDate, address, CMND, phone, workingAddress,  user_password, user_email,
        keysearch, Avatar, status, workingDay, stopWorkingDay }= data
    const userLocalStorage = MethodCommon.getLocalStorage('UserVega')
    const [fileList, setFileList] = useState([]);

    const handleOk = async() => {
        let dataSubmit ={
            employeeID,
            user_name,
            Role,
            birthDate,
            address,
            CMND,
            phone,
            workingAddress,
            user_password,
            user_email,
            keysearch: `${employeeID} ${user_name}`,
            Avatar,
            status,
            workingDay,
            stopWorkingDay,
            fileList
        }
        dispatch(employeesActions.create({data:dataSubmit, pagination:pagination }))
    };

    const handleCancel = () => {
        dispatch(employeesActions.setModalAdd(false))
    };
    
    const handleCancelData =()=>{
        let dataClone = {...data}
        dataClone.code = ''
        dataClone.name = ''
        dispatch(employeesActions.setModalAdd(false))
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handleChangeCode =(e)=>{
        let dataClone = {...data}
        dataClone.employeeID= e.target.value
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handleChangeName =(e)=>{
        let dataClone = {...data}
        dataClone.user_name= e.target.value
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handleChangePassword =(e)=>{
        let dataClone = {...data}
        dataClone.user_password= e.target.value
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handleChangeEmail =(e)=>{
        let dataClone = {...data}
        dataClone.user_email= e.target.value
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const onChangeBirthDate =(date, dateString)=>{
        const timeStamp = MethodCommon.convertToTimeStamp(date)
        let dataClone = {...data}
        dataClone.birthDate= timeStamp
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handleChangeCMND =(e)=>{
        let dataClone = {...data}
        dataClone.CMND = e.target.value.replace(/\D/g, '');
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handleChangeAddress =(e)=>{
        let dataClone = {...data}
        dataClone.address = e.target.value
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const onChangeStartWorkingDate =(date, dateString)=>{
        const timeStamp = MethodCommon.convertToTimeStamp(date)
        let dataClone = {...data}
        dataClone.workingDay= timeStamp
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const onChangeEndWorkingDate =(date, dateString)=>{
        const timeStamp = MethodCommon.convertToTimeStamp(date)
        let dataClone = {...data}
        dataClone.stopWorkingDay= timeStamp
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handleChangeWorkingAddress =(e)=>{
        let dataClone = {...data}
        dataClone.workingAddress = e.target.value
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const onChangePhone =(e)=>{
        let dataClone = {...data}
        dataClone.phone = e.target.value.replace(/\D/g, '');
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handle_ImageChange =(value)=>{
        let dataClone = {...data}
        console.log("value:",value)
       
        dataClone.Avatar= value[0]
        if( value[0].thumbUrl !== null && value[0].thumbUrl !== '' && value[0].thumbUrl !== undefined){
            dispatch(employeesActions.updateDataInput(dataClone))
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }
  return (
    <>
      <Modal 
          title={<span className={styles['title']}>Thêm nhân viên</span>} 
          className={styles['modal']}
          visible={isOpenAdd} 
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
            <div className={styles['employeeInfo']}>

                <div className={styles['employeeId_field']}>
                    <div className={styles['container']}>
                        <span>Mã nhân viên</span>
                        <div className={styles['divInput']}>
                            <Input value={employeeID} onChange={handleChangeCode} />
                        </div>
                    </div>
                </div>

                <div className={styles['fullName_field']}>
                    <div className={styles['container']}>
                        <span>Họ tên đầy đủ</span>
                        <div className={styles['divInput']}>
                            <Input value={user_name} onChange={handleChangeName}/>
                        </div>
                    </div>
                </div>

                <div className={styles['role_field']}>
                    <div className={styles['container']}>
                        <span>Vai trò</span>
                        <div className={styles['divInput']}>
                            <Input  onChange={handleChangeName} />
                        </div>
                    </div>
                </div>

                <div className={styles['password_field']}>
                    <div className={styles['container']}>
                        <span>Mật khẩu</span>
                        <div className={styles['divInput']}>
                          <Input.Password placeholder="input password" value={user_password} onChange={handleChangePassword}/>
                        </div>
                    </div>
                </div>

                <div className={styles['email_field']}>
                    <div className={styles['container']}>
                        <span>Email</span>
                        <div className={styles['divInput']}>
                            <Input value={user_email} onChange={handleChangeEmail}/>
                        </div>
                    </div>
                </div>

                <div className={styles['birthday_field']}>
                    <div className={styles['container']}>
                        <span>Ngày sinh</span>
                        <div className={styles['divInput']}>
                            <DatePicker onChange={onChangeBirthDate} format={FORMAT_DATE}/>
                        </div>  
                    </div>
                </div>

                <div className={styles['cmnd_field']}>
                    <div className={styles['container']}>
                        <span>Chứng minh/Căn cước công dân</span>
                        <div className={styles['divInput']}>
                            <Input value={CMND} onChange={handleChangeCMND}/>
                        </div>
                    </div>
                </div>

                <div className={styles['phone_field']}>
                    <div className={styles['container']}>
                        <span>Số điện thoại</span>
                        <div className={styles['divInput']}>
                            <Input  value={phone} onChange={onChangePhone}/>
                        </div>
                    </div>
                </div>
      
                <div className={styles['startWorkingDate_field']}>
                    <div className={styles['container']}>
                        <span>Ngày vào làm</span>
                        <div className={styles['divInput']}>
                            <DatePicker onChange={onChangeStartWorkingDate} format={FORMAT_DATE} />
                        </div>
                    </div>
                </div>

                <div className={styles['endWorkingDate_field']}>
                    <div className={styles['container']}>
                        <span>Ngày kết thúc làm</span>
                        <div className={styles['divInput']}>
                            <DatePicker onChange={onChangeEndWorkingDate} format={FORMAT_DATE}/>
                        </div> 
                    </div>
                </div> 

                <div className={styles['address_field']}>
                    <div className={styles['container']}>
                        <span>Địa chỉ</span>
                        <div className={styles['divInput']}>
                            <Input value={address} onChange={handleChangeAddress} />
                        </div>
                    </div>
                </div>
                
                <div className={styles['workingAddress_field']}>
                    <div className={styles['container']}>
                        <span>Trụ sở làm việc</span>
                        <div className={styles['divInput']}>
                            <Input value={workingAddress} onChange={handleChangeWorkingAddress}/>
                        </div>
                    </div>
                </div>

                <div className={styles['avatar_field']}>
                    <div className={styles['container']}>
                        <span>Ảnh</span>
                        <div className={styles['divInput']}>
                            {/* <Input onChange={handleChangeName}/> */}
                            <UploadImage
                              number_ImageAllow = {1}
                              title = {''}
                              multiple = {false}
                              handle_ImageChange = {handle_ImageChange}
                            //   fileList = {data.Avatar !== null ? [data.Avatar] :[]}
                             fileList = {fileList}
                             setFileList ={setFileList}
                             
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </Modal>
    </>
  )
}


export default memo(ModalAdd)
