import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ConfirmDelete from '../../../commonComponent/ConfirmDelete/ConfirmDelete';
import { setConfirmDelete } from "../../../Redux/slices/Status.slice"

function ConfirmDeleteStatus(props) {
  
  const dispatch = useDispatch();
  const { handleConfirmDelete} =props
  const isOpenConfirmDelete = useSelector((state)=> state.statusSlice.isOpenConfirmDelete)

  const handleOk = () => {
    handleConfirmDelete()
  };

  const handleCancel = () => {
    dispatch(setConfirmDelete(false))
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

export default ConfirmDeleteStatus