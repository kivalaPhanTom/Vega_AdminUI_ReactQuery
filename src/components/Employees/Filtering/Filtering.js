import React, {useState} from 'react'
import { BiFilterAlt } from "react-icons/bi";
import styles from "./index.module.css"
import { Modal } from 'antd';
import { Select } from 'antd';

const options = [];

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}

function Filtering(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
 

 const showModal = () => {
   setIsModalOpen(true);
 };

 const handleOk = () => {
   setIsModalOpen(false);
 };

 const handleCancel = () => {
   setIsModalOpen(false);
 };

 const [value, setValue] = useState(['a10', 'c12', 'h17', 'j19', 'k20'])
 const selectProps = {
  mode: 'multiple',
  style: {
    width: '100%',
  },
  value,
  options,
  onChange: (newValue) => {
    setValue(newValue);
  },
  placeholder: 'Select Item...',
  maxTagCount: 'responsive',
};
  return (
    <>
      <div className={styles['settingArea']}>
        <BiFilterAlt 
         className={styles['iconSettings']}
         onClick={showModal}
        />
      </div>
      <Modal 
        title={<span className={styles['title']}>Bộ lọc</span>}  
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <button key="cancel" onClick={handleCancel} className={styles['btn_cancel']}>
              Hủy
          </button>,
          <button key="submit" onClick={handleOk} className={styles['btn_submit']}>
              Lưu
          </button>,
    ]}
      >
        <div className={styles['modal_filtering']}>

           <div className={styles['createdUser']}>
            <div className={styles['createdUserContainer']}>
              <span>Người tạo</span>
              <Select 
                {...selectProps}
              />
            </div>
           </div>

           <div className={styles['updatedUser']}>
            <div className={styles['updatedUserContainer']}>
              <span>Người cập nhật</span>
              <Select 
                {...selectProps}
              />
            </div>
           </div>
           
           <div className={styles['createdDate']}>
            <div className={styles['createdDateContainer']}>
              <span>Ngày tạo</span>
              <Select 
                {...selectProps}
              />
            </div>
           </div>

           <div className={styles['updatedDate']}>
            <div className={styles['updatedDateContainer']}>
              <span>Ngày cập nhật</span>
              <Select 
                {...selectProps}
              />
            </div>
           </div>

        </div>
        
      </Modal>
    </>
  )
}

export default Filtering
