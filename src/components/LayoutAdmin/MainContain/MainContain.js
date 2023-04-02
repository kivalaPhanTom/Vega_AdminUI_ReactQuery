import React from 'react'
import styles from './MainContain.module.scss'
import SearchInput from './SearchInput/SearchInput';
import Notify from '../../Notify/Notify';
import Filtering from './Filtering/Filtering';
import TableContain from './TableContain/TableContain';

function MainContain(props) {
  const {selectedRows, selectedRowKeys, setSelectedRows, setSelectedRowKeys, keySearch, setKeySearch, setOpenModalAdd,
    columns, dataRow, totalData, title, handleSubmitSearch, handleChangePagination, handlSetConfirmDelete} = props
  return (
    <div className={styles["mainContent"]}>
        <div className={styles["search_and_notify"]}>
            <div className={styles["search_and_notify_container"]}>
                    <SearchInput 
                        keySearch={keySearch} 
                        setKeySearch={setKeySearch}
                        handleSubmitSearch = {handleSubmitSearch}
                    />
                    <Filtering />
                    {/* <ModalAdd/>  */}
                    <div className={styles["notify"]}>
                    <Notify />
                    </div>
            </div>
        </div>

        <div className={styles["tableSection"]}>
           <div className={styles["table_maingroup_container"]}>
               <TableContain
                   title = {title}
                   selectedRows={selectedRows}
                   selectedRowKeys={selectedRowKeys}
                   handleSetSelectedRows={setSelectedRows}
                   handleSetSelectedRowKeys={setSelectedRowKeys}
                   columns = {columns}
                   dataRow = {dataRow}
                   totalData = {totalData}
                   handleChangePagination = {handleChangePagination}
                   handlSetConfirmDelete = {handlSetConfirmDelete}
                   setOpenModalAdd = {setOpenModalAdd}
                />
            </div>     
        </div>
    </div>
  )
}



export default MainContain
