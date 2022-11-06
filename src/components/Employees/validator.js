export function checkIsChangedData(dataBefore, dataAfter){
    let result  = false
    if( dataBefore.employeeID !== dataAfter.employeeID){
        result  = true
    }
    if( dataBefore.user_name !== dataAfter.user_name){
        result  = true
    }
    if( dataBefore.Role !== dataAfter.Role){
        result  = true
    }
    if( dataBefore.birthDate !== dataAfter.birthDate){
        result  = true
    }
    if( dataBefore.address !== dataAfter.address){
        result  = true
    }
    if( dataBefore.CMND !== dataAfter.CMND){
        result  = true
    }
    if( dataBefore.phone !== dataAfter.phone){
        result  = true
    }
    if( dataBefore.workingAddress !== dataAfter.workingAddress){
        result  = true
    }
    if( dataBefore.user_email !== dataAfter.user_email){
        result  = true
    }
    // if( dataBefore.status !== dataAfter.status){
    //     result  = true
    // }
    if( dataBefore.workingDay !== dataAfter.workingDay){
        result  = true
    }
    if( dataBefore.stopWorkingDay !== dataAfter.stopWorkingDay){
        result  = true
    }
    if( dataBefore.Avatar.uid !== dataAfter.fileList[0].uid){
        result  = true
    }
    return result
    
    // employeeID,
    //             user_name,
    //             Role,
    //             birthDate,
    //             address,
    //             CMND,
    //             phone,
    //             workingAddress,
    //             user_password,
    //             user_email,
    //             keysearch: `${employeeID} ${user_name}`,
    //             Avatar,
    //             status,
    //             workingDay,
    //             stopWorkingDay,
    //             fileList
   

}