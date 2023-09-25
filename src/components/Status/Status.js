import React,{useState} from 'react'
// import styles from "./css/index.module.css"
import ModalAdd from './ModalAdd/ModalAdd'
import { useSelector, useDispatch } from 'react-redux'
import ConfirmDeleteStatus from './ConfirmDeleteStatus/ConfirmDeleteStatus'
import ModalEdit from './ModalEdit/ModalEdit'
import Filtering from './Filtering/Filtering'
import Notify from '../Notify/Notify';
import styles from "./Status.module.scss"
import MainContain from '../LayoutAdmin/MainContain/MainContain'
import { MethodCommon } from "../../Common/methods"
import { FaPen, FaTrash } from "react-icons/fa"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Service } from '../../Services/Status/Status'
import { PAGINATION_DEFAULT, RESULT_STATUS, CACHETIME, STALETIME } from "../../Common/Common_Parameter"
import { setModalAdd, updateDataEdit, setConfirmEdit, setConfirmDelete, handleAlertDeleteResultAction } from "../../Redux/slices/Status.slice"
import { commonAlerError } from "../../Common/error"
import { useNavigate } from "react-router-dom"
import { MessageCommon } from "../../Common/message"

function Status(props) {
  const dispatch = useDispatch()
  const pagination = useSelector((state)=> state.statusSlice.pagination)
  // const isOpenModalFiltering = useSelector((state) => state.userRoleSlice.isOpenModalFiltering)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [keySearch, setKeySearch] = useState('')
  const queryString = MethodCommon.renderQueryString()
  const page = Number(queryString.page) || PAGINATION_DEFAULT.pageCurrent
  const limit = Number(queryString.limit) || PAGINATION_DEFAULT.pageSize
  const key = queryString.key || ''
  const queryClient = useQueryClient()
  const lang = ''
  const navigate = useNavigate()
  const statusQuery = useQuery({
    queryKey: ['status', page, limit, key], //userRoles là tên loại query, page, limit, key được truyền vào chính là các dependency như useffect,
    // để khi có thay đổi thì queryFn sẽ được gọi lại. queryKey dùng cơ chế deep comparison để
    // biết  xem là dependency có bị thay đổi hay không
    queryFn: () => {
      return Service.searchAndPaginationStatus({ page, limit, key })
    },
    cacheTime: CACHETIME, //15s, thời gian data được lưu trong cache
    staleTime: STALETIME, //10s, là khoảng thời gian mà dữ liệu trong cache được cho là đã cũ
    keepPreviousData: true, //giữ lại dữ liệu cũ trong quá trình fetch lại data, chứ ko để undefined khi fetch data
    retry: 0 // mặc định retry là 3 lần
  })

  const deleteUserRoleMutation = useMutation({
    mutationFn: (data) => {
      return Service.deleteStatus(data)
    },
    onSuccess: async (res) => {
      if (res.data.result === RESULT_STATUS.SUCCESS) dispatch(setConfirmDelete(false))
      dispatch(handleAlertDeleteResultAction({
        signal: res.data.result,
        lang: ''
      }))
      queryClient.invalidateQueries(['status']) //để refresh lại api gọi danh sách
    },
    onError: () => {
      commonAlerError(lang)
    },
  })

  const handleSetSelectedRows =(value)=>{
    setSelectedRows(value)
  }
  const handleSetSelectedRowKeys =(value)=>{
    setSelectedRowKeys(value)
  }

  const handleConfirmEditItem =(item)=>{
    const dataEdit = {
        id: item.id,
        code: item.statusCode,
        name: item.statusName,
    }
    dispatch(updateDataEdit(dataEdit))
    dispatch(setConfirmEdit(true))
  }

  const handleConfirmDeleteItem=(item)=>{
    handleSetSelectedRows([item])
    dispatch(setConfirmDelete(true))
  } 

  const columns = [
    {
      title: 'Tên trạng thái',
      dataIndex: 'statusCode',
    },
    {
      title: 'Mã trạng thái',
      dataIndex: 'statusName',
    },
    // {
    //   title: 'Người tạo',
    //   render: (data) => {
    //     let userCreateResult = <></>
    //     if( data.UserCreated !== null){
    //           const {UserCreated_Object} = data
    //           userCreateResult = <span>{UserCreated_Object !== null ? UserCreated_Object.user_name :""}</span>
    //     }
    //     return userCreateResult
    //   }
    // },
    // {
    //   title: 'Ngày tạo',
    //   dataIndex: 'CreatedDate',
    //   render: (createdDate) => {
    //       let createdDateResult = <></>
    //       if( createdDate !== null){
    //         createdDateResult = <span>{MethodCommon.formatTime(createdDate)}</span>
    //       }
    //       return createdDateResult
    //   }
    // },
    // {
    //   title: 'Người cập nhật',
    //   render: (data) => {
    //     let userUpdateResult = <></>
    //     if( data.UserUpdated !== null){
    //           const {UserUpdated_Object} = data
    //           userUpdateResult = <p>{UserUpdated_Object !== null ? UserUpdated_Object.user_name : ""}</p>
    //     }
    //     return userUpdateResult
    //   }
    // },
    // {
    //   title: 'Ngày cập nhật',
    //   dataIndex: 'UpdatedDate',
    //   render: (UpdatedDate) => {
    //       let updatedDateResult = <></>
    //       if( UpdatedDate !== null){
    //         updatedDateResult = <span>{MethodCommon.formatTime(UpdatedDate)}</span>
    //       }
    //       return updatedDateResult
    //   }
    // },
    {
      title: 'Hành động',
      align:'center',
      render: (item) => {
        return(
          <div className={styles['icon_actions']}>
            <FaPen onClick = {()=>handleConfirmEditItem(item)} className={styles['icon_edit']}/>
            <FaTrash onClick = {()=>handleConfirmDeleteItem(item)} className={styles['icon_delete']}/>
          </div>
        )
      },
    },
  ]
  // const columns = [
  //   {
  //     title: 'Mã vai trò',
  //     dataIndex: 'userRoleCode',
  //   },
  //   {
  //     title: 'Tên vai trò',
  //     dataIndex: 'userRoleName',
  //   },
  //   {
  //     title: 'Người tạo',
  //     render: (data) => {
  //       let userCreateResult = <></>
  //       if (data.UserCreated !== null) {
  //         const { UserCreated_Object } = data
  //         userCreateResult = <span>{UserCreated_Object !== null ? UserCreated_Object.user_name : ""}</span>
  //       }
  //       return userCreateResult
  //     }
  //   },
  //   {
  //     title: 'Ngày tạo',
  //     dataIndex: 'CreatedDate',
  //     render: (createdDate) => {
  //       let createdDateResult = <></>
  //       if (createdDate !== null) {
  //         createdDateResult = <span>{MethodCommon.formatTime(createdDate)}</span>
  //       }
  //       return createdDateResult
  //     }
  //   },
  //   {
  //     title: 'Người cập nhật',
  //     render: (data) => {
  //       let userUpdateResult = <></>
  //       if (data.UserUpdated !== null) {
  //         const { UserUpdated_Object } = data
  //         userUpdateResult = <p>{UserUpdated_Object !== null ? UserUpdated_Object.user_name : ""}</p>
  //       }
  //       return userUpdateResult
  //     }
  //   },
  //   {
  //     title: 'Ngày cập nhật',
  //     dataIndex: 'UpdatedDate',
  //     render: (UpdatedDate) => {
  //       let updatedDateResult = <></>
  //       if (UpdatedDate !== null) {
  //         updatedDateResult = <span>{MethodCommon.formatTime(UpdatedDate)}</span>
  //       }
  //       return updatedDateResult
  //     }
  //   },
  //   {
  //     title: 'Hành động',
  //     render: (item) => {
  //       return (
  //         <div className={styles['icon_actions']}>
  //           <FaPen onClick={() => handleConfirmEditItem(item)} className={styles['icon_edit']} />
  //           <FaTrash onClick={() => handleConfirmDeleteItem(item)} className={styles['icon_delete']} />
  //         </div>
  //       )
  //     },
  //   },
  // ];

  const handleSubmitSearch = () => {
    navigate(`?page=${PAGINATION_DEFAULT.pageCurrent}&&limit=${limit}&&key=${keySearch}`)
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
    // dispatch(setModalFiltering(value))
  }
  const handleConfirmDelete = () => {
    let arrIdNeedDelete = []
    selectedRows.forEach((item) => {
      arrIdNeedDelete.push(item._id)
    })
    deleteUserRoleMutation.mutate(arrIdNeedDelete)
  }

  return (
    <>
    <MainContain
      title={'Quản lý trạng thái'}
      columns={columns}
      dataRow={statusQuery.data ? MethodCommon.generateKeyForTableData(statusQuery.data.data.data.docs) : []}
      selectedRows={selectedRows}
      setSelectedRows={handleSetSelectedRows}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={handleSetSelectedRowKeys}
      keySearch={keySearch}
      setKeySearch={setKeySearch}
      totalData={statusQuery.data ? statusQuery.data.data.data.total : 0}
      handleSubmitSearch={handleSubmitSearch}
      handleChangePagination={handleChangePagination}
      handlSetConfirmDelete={handlSetConfirmDelete}
      setOpenModalAdd={setOpenModalAdd}
      isOpenModalFitltering={false}
      setModalFitlering={handleSetOpenModalFiltering}
    />
    <ModalAdd />
    <ModalEdit />
    <ConfirmDeleteStatus
      handleConfirmDelete={handleConfirmDelete}
    />
    {/* <Filtering
      isOpenModalFitltering={isOpenModalFiltering}
      setModalFitlering={handleSetOpenModalFiltering}
    /> */}
    </>
  )
}

export default Status
