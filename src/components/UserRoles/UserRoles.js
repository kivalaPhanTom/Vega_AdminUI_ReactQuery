/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styles from "./UserRoles.module.scss"
import ModalAdd from './ModalAdd/ModalAdd';
import { useSelector, useDispatch } from 'react-redux';
import ModalEdit from './ModalEdit/ModalEdit';
import ConfirmDeleteUserRole from './ConfirmDeleteUserRole/ConfirmDeleteUserRole';
import MainContain from '../LayoutAdmin/MainContain/MainContain';
import { MethodCommon } from "../../Common/methods";
import { FaPen, FaTrash } from "react-icons/fa";
import { PAGINATION_DEFAULT, RESULT_STATUS } from "../../Common/Common_Parameter";
import { MessageCommon } from "../../Common/message";
import Filtering from './Filtering/Filtering';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Service } from '../../Services/UserRole/UserRole'
import { setLoading } from '../../Redux/slices/Loading.slice'
import { useNavigate } from "react-router-dom"
import { commonAlerError } from "../../Common/error"
import { setModalAdd, setConfirmDelete, handleAlertDeleteResultAction, setConfirmEdit, setModalFiltering, updateDataEdit, resetData } from "../../Redux/slices/UserRole.slice"

function UserRoles(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [keySearch, setKeySearch] = useState('')
  const isOpenModalFiltering = useSelector((state) => state.userRoleSlice.isOpenModalFiltering)
  const queryString = MethodCommon.renderQueryString()
  const page = Number(queryString.page) || PAGINATION_DEFAULT.pageCurrent
  const limit = Number(queryString.limit) || PAGINATION_DEFAULT.pageSize
  const key = queryString.key || ''
  const lang = ''
  const userRolesQuery = useQuery({
    queryKey: ['userRoles', page, limit, key], //userRoles là tên loại query, page, limit, key được truyền vào chính là các dependency như useffect,
    // để khi có thay đổi thì queryFn sẽ được gọi lại. queryKey dùng cơ chế deep comparison để
    // biết  xem là dependency có bị thay đổi hay không
    queryFn: () => {
      return Service.searchAndPaginationUserRole({ page, limit, key })
    },
    cacheTime: 15000,//15s, thời gian data được lưu trong cache
    staleTime: 10000, //10s, là khoảng thời gian mà dữ liệu trong cache được cho là đã cũ
    keepPreviousData: true, //giữ lại dữ liệu cũ trong quá trình fetch lại data, chứ ko để undefined khi fetch data
    retry: 0 // mặc định retry là 3 lần
  })
  const deleteUserRoleMutation = useMutation({
    mutationFn: (data) => {
      return Service.deleteUserRole(data)
    },
    onSuccess: async (res) => {
      if (res.data.result === RESULT_STATUS.SUCCESS) dispatch(setConfirmDelete(false))
      dispatch(handleAlertDeleteResultAction({
        signal: res.data.result,
        lang: ''
      }))
      queryClient.invalidateQueries(['userRoles']) //để refresh lại api gọi danh sách
    },
    onError: () => {
      commonAlerError(lang)
    },
  })
  const columns = [
    {
      title: 'Mã vai trò',
      dataIndex: 'userRoleCode',
    },
    {
      title: 'Tên vai trò',
      dataIndex: 'userRoleName',
    },
    {
      title: 'Người tạo',
      render: (data) => {
        let userCreateResult = <></>
        if (data.UserCreated !== null) {
          const { UserCreated_Object } = data
          userCreateResult = <span>{UserCreated_Object !== null ? UserCreated_Object.user_name : ""}</span>
        }
        return userCreateResult
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedDate',
      render: (createdDate) => {
        let createdDateResult = <></>
        if (createdDate !== null) {
          createdDateResult = <span>{MethodCommon.formatTime(createdDate)}</span>
        }
        return createdDateResult
      }
    },
    {
      title: 'Người cập nhật',
      render: (data) => {
        let userUpdateResult = <></>
        if (data.UserUpdated !== null) {
          const { UserUpdated_Object } = data
          userUpdateResult = <p>{UserUpdated_Object !== null ? UserUpdated_Object.user_name : ""}</p>
        }
        return userUpdateResult
      }
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'UpdatedDate',
      render: (UpdatedDate) => {
        let updatedDateResult = <></>
        if (UpdatedDate !== null) {
          updatedDateResult = <span>{MethodCommon.formatTime(UpdatedDate)}</span>
        }
        return updatedDateResult
      }
    },
    {
      title: 'Hành động',
      render: (item) => {
        return (
          <div className={styles['icon_actions']}>
            <FaPen onClick={() => handleConfirmEditItem(item)} className={styles['icon_edit']} />
            <FaTrash onClick={() => handleConfirmDeleteItem(item)} className={styles['icon_delete']} />
          </div>
        )
      },
    },
  ];

  useEffect(() => {
    handleSetLoading(userRolesQuery.isLoading)
  }, [userRolesQuery.isLoading])

  useEffect(() => {
    handleSetLoading(deleteUserRoleMutation.isLoading)
  }, [deleteUserRoleMutation.isLoading])

  const handleSetLoading = (is_loading) => {
    if (is_loading) {
      dispatch(setLoading(true))
    } else {
      dispatch(setLoading(false))
    }
  }

  const handleSetSelectedRows = (value) => {
    setSelectedRows(value)
  }
  const handleSetSelectedRowKeys = (value) => {
    setSelectedRowKeys(value)
  }

  const handleConfirmDelete = () => {
    let arrIdNeedDelete = []
    selectedRows.forEach((item) => {
      arrIdNeedDelete.push(item._id)
    })
    deleteUserRoleMutation.mutate(arrIdNeedDelete)
  }

  const handleConfirmEditItem = (item) => {
    const dataEdit = {
      id: item._id,
      userRoleCode: item.userRoleCode,
      userRoleName: item.userRoleName,
    }
    dispatch(updateDataEdit(dataEdit))
    dispatch(setConfirmEdit(true))
  }

  const handleConfirmDeleteItem = (item) => {
    handleSetSelectedRows([item])
    dispatch(setConfirmDelete(true))
  }

  const handleSubmitSearch = () => {
    handleChangePagination(PAGINATION_DEFAULT.pageCurrent, PAGINATION_DEFAULT.pageSize)
  }

  const handleChangePagination = (page_index, page_size) => {
    navigate(`?page=${page_index}&&limit=${page_size}&&key=${key}`)
  }

  const handlSetConfirmDelete = () => {
    if (selectedRows.length > 0) {
      dispatch(setConfirmDelete(true))
    } else {
      MessageCommon.openNotificationError("Vui lòng chọn dữ liệu")
    }
  }

  const setOpenModalAdd = () => {
    dispatch(setModalAdd(true))
  }
  const handleSetOpenModalFiltering = (value) => {
    dispatch(setModalFiltering(value))
  }

  return (
    <>
      <MainContain
        title={'Quản lý vai trò người dùng'}
        columns={columns}
        dataRow={userRolesQuery.data ? MethodCommon.generateKeyForTableData(userRolesQuery.data.data.data.docs) : []}
        selectedRows={selectedRows}
        setSelectedRows={handleSetSelectedRows}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={handleSetSelectedRowKeys}
        keySearch={keySearch}
        setKeySearch={setKeySearch}
        totalData={userRolesQuery.data ? userRolesQuery.data.data.data.total : 0}
        handleSubmitSearch={handleSubmitSearch}
        handleChangePagination={handleChangePagination}
        handlSetConfirmDelete={handlSetConfirmDelete}
        setOpenModalAdd={setOpenModalAdd}
        isOpenModalFitltering={isOpenModalFiltering}
        setModalFitlering={handleSetOpenModalFiltering}
      />
      <ModalAdd />
      <ModalEdit />
      <ConfirmDeleteUserRole
        handleConfirmDelete={handleConfirmDelete}
      />
      <Filtering
        isOpenModalFitltering={isOpenModalFiltering}
        setModalFitlering={handleSetOpenModalFiltering}
      />
    </>
  )
}

export default UserRoles
