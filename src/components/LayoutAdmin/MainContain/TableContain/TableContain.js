import React, { useState, useEffect, memo } from 'react';
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import styles from "./TableContain.module.scss"
import TableData from '../../../../commonComponent/TableData/TableData';
import PaginationData from '../../../../commonComponent/PaginationData/PaginationData';

function TableContain(props) {
    const { selectedRows, selectedRowKeys, handleSetSelectedRows, handleSetSelectedRowKeys, totalData, columns, 
      dataRow, title, handleChangePagination, handlSetConfirmDelete, setOpenModalAdd} = props

    const onChangePagination =(page_index, page_size)=>{
        handleChangePagination(page_index, page_size)
    } 

    const handleUpdateSelectedRows =(values)=>{
      handleSetSelectedRows(values)
    }

    const handleUpdateSelectedRowsKey =(values)=>{
      handleSetSelectedRowKeys(values)
    }

    const handleAdd=()=>{
      setOpenModalAdd()
    }
  
    return (
      <>
        <div className={styles["tableContainer"]}>
            <div className={styles["table_heaader"]}>
                    <div className={styles["table_heaader_container"]}>
                        <div className={styles["table_title"]}>
                            <span id={styles["title_manage"]}>{title}</span>
                        </div>
                        <div className={styles["table_actions"]}>
                            <div className={styles["delete_Action"]} onClick ={handlSetConfirmDelete}>
                                <AiFillDelete className={styles["icon_action"]}/>
                                <span className={styles["label_btn"]}>Xoá</span>
                            </div>
                            <div className={styles["add_Action"]} onClick={handleAdd}>
                                  <AiFillPlusCircle className={styles["icon_action"]}/>
                                  <span className={styles["label_btn"]}>Thêm mới</span>
                            </div> 
                        </div>
                    </div>
            </div>

            <div className={styles["table"]}>
                <TableData
                    columns={columns}
                    dataRow={dataRow}
                    handleUpdateSelectedRows={handleUpdateSelectedRows}
                    selectedRows={selectedRows}
                    selectedRowKeysProp={selectedRowKeys}
                    handleUpdateSelectedRowsKey={handleUpdateSelectedRowsKey}
                />
            </div>
        </div>

        <div className={styles["table_pagination"]}>
             <PaginationData
               total = {totalData}
               handleChangePagination = {onChangePagination}
             />
        </div>

      </>
    )
}
export default memo(TableContain)
