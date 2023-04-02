import React, {memo} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as userRoleActions  from "../../../Redux/Actions/UserRole.action";
import ConfirmDelete from '../../../commonComponent/ConfirmDelete/ConfirmDelete';

function ConfirmDeleteUserRole(props) {
  
  const dispatch = useDispatch();
  const { handleConfirmDelete} =props

  const isOpenConfirmDelete = useSelector((state)=> state.userRoleSlice.isOpenConfirmDelete)

  const handleOk = () => {
    handleConfirmDelete()
  };

  const handleCancel = () => {
    dispatch(userRoleActions.setConfirmDelete(false))
  };

  return (
    <>
      <ConfirmDelete 
        handleOk = {handleOk}
        handleCancel = {handleCancel}
        isOpen = {isOpenConfirmDelete}
      />
    </>
  )
}

export default ConfirmDeleteUserRole
