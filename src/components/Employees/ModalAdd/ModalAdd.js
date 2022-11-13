import React,{useState, memo, useEffect} from 'react'
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
    const pagination = useSelector((state)=> state.employeesSlice.pagination)
    const { employeeID, user_name, Role, birthDate, address, CMND, phone, workingAddress,  user_password, user_email,
        keysearch, Avatar, status, workingDay, stopWorkingDay }= data
    const [fileList, setFileList] = useState([]);
    const [errRequiredEmployeeID, setErrRequiredEmployeeID] = useState(false);
    const [errRequiredFullName, setErrRequiredFullName] = useState(false);
    const [errRequiredRole, setErrRequiredRole] = useState(false);
    const [errRequiredPassword, setErrRequiredPassword] = useState(false);
    const [errRequiredEmail, setErrRequiredEmail] = useState(false);
    const [errRequiredBirthDay, setErrRequireddBirthDay] = useState(false);
    const [errRequiredCMND, setErrRequireddCMND] = useState(false);
    const [errRequiredPhone, setErrRequiredPhone] = useState(false);
    const [errRequiredStartWorkingDay, setErrRequiredStartWorkingDay] = useState(false);
    const [errRequiredEndWorkingDay, setErrRequiredEndWorkingDay] = useState(false);
    const [errRequiredAddress, setErrRequiredAddress] = useState(false);
    const [errRequiredWorkingAddress, setErrRequiredWorkingAddress] = useState(false);
    const [errRequiredAvatar, setErrRequiredAvatar] = useState(false);

    useEffect(() => {
        if(isOpenAdd === false){
            setFileList([])
        }
    }, [isOpenAdd]);

    const handleOk = async() => {

        if(employeeID.trim() === ""){
            setErrRequiredEmployeeID(true)
        }else{
            setErrRequiredEmployeeID(false)
        }

        if(user_name.trim() === ""){
            setErrRequiredFullName(true)
        }else{
            setErrRequiredFullName(false)
        }

        if(user_password.trim() === ""){
            setErrRequiredPassword(true)
        }else{
            setErrRequiredPassword(false)
        }

        if(user_email.trim() === ""){
            setErrRequiredEmail(true)
        }else{
            setErrRequiredEmail(false)
        }

        if(birthDate === null){
            setErrRequireddBirthDay(true)
        }else{
            setErrRequireddBirthDay(false)
        }

        if(CMND.trim() === ''){
            setErrRequireddCMND(true)
        }else{
            setErrRequireddCMND(false)
        }

        if(phone.trim() === ''){
            setErrRequiredPhone(true)
        }else{
            setErrRequiredPhone(false)
        }
        
        if(workingDay === null){
            setErrRequiredStartWorkingDay(true)
        }else{
            setErrRequiredStartWorkingDay(false)
        }

        if(stopWorkingDay === null){
            setErrRequiredEndWorkingDay(true)
        }else{
            setErrRequiredEndWorkingDay(false)
        }

        if(address.trim() === ''){
            setErrRequiredAddress(true)
        }else{
            setErrRequiredAddress(false)
        }

        if(workingAddress.trim() === ''){
            setErrRequiredWorkingAddress(true)
        }else{
            setErrRequiredWorkingAddress(false)
        }

        if(fileList.length === 0){
            setErrRequiredAvatar(true)
        }else{
            setErrRequiredAvatar(false)
        }

        if(employeeID.trim() !== "" && user_name.trim() !== "" && user_password.trim() !== "" && user_email.trim() !== "" && birthDate !== null
           && CMND.trim() !== ''  && phone.trim() !== '' && workingDay !== null && stopWorkingDay !== null && address.trim() !== '' &&
           workingAddress.trim() !== '' && fileList.length > 0){
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
        }
    };

    const handleCancel = () => {
        dispatch(employeesActions.setModalAdd(false))
        dispatch(employeesActions.resetData({}))
        setErrRequiredEmployeeID(false)
        setErrRequiredFullName(false)
        setErrRequiredPassword(false)
        setErrRequiredEmail(false)
        setErrRequireddBirthDay(false)
        setErrRequireddCMND(false)
        setErrRequiredPhone(false)
        setErrRequiredStartWorkingDay(false)
        setErrRequiredEndWorkingDay(false)
        setErrRequiredAddress(false)
        setErrRequiredWorkingAddress(false)
        setErrRequiredAvatar(false) 
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
        if(e.target.value !== ''){
            setErrRequiredEmployeeID(false)
        }else{
            setErrRequiredEmployeeID(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handleChangeName =(e)=>{
        let dataClone = {...data}
        dataClone.user_name= e.target.value
        if(e.target.value !== ''){
            setErrRequiredFullName(false)
        }else{
            setErrRequiredFullName(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const handleChangeRole =(e)=>{
        let dataClone = {...data}
        dataClone.Role= e.target.value
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const handleChangePassword =(e)=>{ 
        let dataClone = {...data}
        dataClone.user_password= e.target.value
        if(e.target.value !== ''){
            setErrRequiredPassword(false)
        }else{
            setErrRequiredPassword(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const handleChangeEmail =(e)=>{ 
        let dataClone = {...data}
        dataClone.user_email= e.target.value
        if(e.target.value !== ''){
            setErrRequiredEmail(false)
        }else{
            setErrRequiredEmail(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const onChangeBirthDate =(date, dateString)=>{ 
        const timeStamp = MethodCommon.convertToTimeStamp(date)
        let dataClone = {...data}
        dataClone.birthDate= timeStamp
        if(timeStamp === 0) dataClone.birthDate = null
        if(timeStamp !== 0){
            setErrRequireddBirthDay(false)
        }else{
            setErrRequireddBirthDay(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const handleChangeCMND =(e)=>{ 
        let dataClone = {...data}
        dataClone.CMND = e.target.value.replace(/\D/g, '');
        if(dataClone.CMND !== ''){
            setErrRequireddCMND(false)
        }else{
            setErrRequireddCMND(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const handleChangeAddress =(e)=>{ 
        let dataClone = {...data}
        dataClone.address = e.target.value.trim()
        if(dataClone.address !== ''){
            setErrRequiredAddress(false)
        }else{
            setErrRequiredAddress(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const onChangeStartWorkingDate =(date, dateString)=>{ 
        const timeStamp = MethodCommon.convertToTimeStamp(date)
        let dataClone = {...data}
        dataClone.workingDay = timeStamp
        if(timeStamp === 0) dataClone.workingDay = null
        if(timeStamp !== 0){
            setErrRequiredStartWorkingDay(false)
        }else{
            setErrRequiredStartWorkingDay(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const onChangeEndWorkingDate =(date, dateString)=>{
        const timeStamp = MethodCommon.convertToTimeStamp(date)
        let dataClone = {...data}
        dataClone.stopWorkingDay= timeStamp
        if(timeStamp === 0) dataClone.stopWorkingDay = null
        if(timeStamp !== 0){
            setErrRequiredEndWorkingDay(false)
        }else{
            setErrRequiredEndWorkingDay(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const handleChangeWorkingAddress =(e)=>{ 
        let dataClone = {...data}
        dataClone.workingAddress = e.target.value.trim()
        if(dataClone.workingAddress !== ''){
            setErrRequiredWorkingAddress(false)
        }else{
            setErrRequiredWorkingAddress(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }

    const onChangePhone =(e)=>{ 
        let dataClone = {...data}
        dataClone.phone = e.target.value.replace(/\D/g, '');
        if(dataClone.phone !== ''){
            setErrRequiredPhone(false)
        }else{
            setErrRequiredPhone(true)
        }
        dispatch(employeesActions.updateDataInput(dataClone))
    }
    const handle_ImageChange =(value)=>{
        setFileList(value)
        if(value.length > 0){
            setErrRequiredAvatar(false)
        }else{
            setErrRequiredAvatar(true)
        }
    }
    
    return (
        <>
            <Modal 
                title={<span className={styles['title']}>Thêm nhân viên</span>} 
                className={styles['modal']}
                open={isOpenAdd} 
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
                                {
                                    errRequiredEmployeeID ? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                        <div className={styles['fullName_field']}>
                            <div className={styles['container']}>
                                <span>Họ tên đầy đủ</span>
                                <div className={styles['divInput']}>
                                    <Input value={user_name} onChange={handleChangeName}/>
                                </div>
                                {
                                    errRequiredFullName ? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                        {/* <div className={styles['role_field']}>
                            <div className={styles['container']}>
                                <span>Vai trò</span>
                                <div className={styles['divInput']}>
                                    <Input  value = {Role} onChange={handleChangeRole} />
                                </div>
                                {
                                    errRequiredRole? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div> */}

                        <div className={styles['password_field']}>
                            <div className={styles['container']}>
                                <span>Mật khẩu</span>
                                <div className={styles['divInput']}>
                                <Input.Password value={user_password} onChange={handleChangePassword}/>
                                </div>
                                {
                                    errRequiredPassword? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                        <div className={styles['email_field']}>
                            <div className={styles['container']}>
                                <span>Email</span>
                                <div className={styles['divInput']}>
                                    <Input value={user_email} onChange={handleChangeEmail}/>
                                </div>
                                {
                                    errRequiredEmail? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                        <div className={styles['birthday_field']}>
                            <div className={styles['container']}>
                                <span>Ngày sinh</span>
                                <div className={styles['divInput']}>
                                    <DatePicker value ={birthDate !== null ? moment(birthDate) :''} onChange={onChangeBirthDate} format={FORMAT_DATE}/>
                                </div>  
                                {
                                    errRequiredBirthDay? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                        <div className={styles['cmnd_field']}>
                            <div className={styles['container']}>
                                <span>Chứng minh/Căn cước công dân</span>
                                <div className={styles['divInput']}>
                                    <Input value={CMND} onChange={handleChangeCMND}/>
                                </div>
                                {
                                    errRequiredCMND? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                        <div className={styles['phone_field']}>
                            <div className={styles['container']}>
                                <span>Số điện thoại</span>
                                <div className={styles['divInput']}>
                                    <Input  value={phone} onChange={onChangePhone}/>
                                </div>
                                {
                                    errRequiredPhone? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>
            
                        <div className={styles['startWorkingDate_field']}>
                            <div className={styles['container']}>
                                <span>Ngày vào làm</span>
                                <div className={styles['divInput']}>
                                    <DatePicker value ={workingDay !== null ? moment(workingDay) :''} onChange={onChangeStartWorkingDate} format={FORMAT_DATE} />
                                </div>
                                {
                                    errRequiredStartWorkingDay? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                        <div className={styles['endWorkingDate_field']}>
                            <div className={styles['container']}>
                                <span>Ngày kết thúc làm</span>
                                <div className={styles['divInput']}>
                                    <DatePicker value ={stopWorkingDay !== null ? moment(stopWorkingDay) :''} onChange={onChangeEndWorkingDate} format={FORMAT_DATE}/>
                                </div> 
                                {
                                    errRequiredEndWorkingDay? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div> 

                        <div className={styles['address_field']}>
                            <div className={styles['container']}>
                                <span>Địa chỉ</span>
                                <div className={styles['divInput']}>
                                    <Input value={address} onChange={handleChangeAddress} />
                                </div>
                                {
                                    errRequiredAddress? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>
                        
                        <div className={styles['workingAddress_field']}>
                            <div className={styles['container']}>
                                <span>Trụ sở làm việc</span>
                                <div className={styles['divInput']}>
                                    <Input value={workingAddress} onChange={handleChangeWorkingAddress}/>
                                </div>
                                {
                                    errRequiredWorkingAddress? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                        <div className={styles['avatar_field']}>
                            <div className={styles['container']}>
                                <span>Ảnh</span>
                                <div className={styles['divInput']}>
                                    <UploadImage
                                    number_ImageAllow = {1}
                                    title = {'Ảnh đại diện'}
                                    multiple = {false}
                                    handle_ImageChange = {handle_ImageChange}
                                    fileList = {fileList}
                                    setFileList ={setFileList}
                                    />
                                </div>
                                {
                                    errRequiredAvatar? <span className={styles['errRequired']}>(*) Bắt buộc nhập</span> : ''
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
        </>
    )
}


export default memo(ModalAdd)
