import React, {useState} from 'react'
import { BiFilterAlt } from "react-icons/bi";
import styles from "./Filtering.module.scss"
import { Select } from 'antd';
import ModalPopup from '../../../commonComponent/ModalPopup/ModalPopup';

const options = [];

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}

function Filtering(props) {
  const {isOpenModalFitltering, setModalFitlering} = props


//  const showModal = () => {
//    setIsModalOpen(true);
//  };

 const handleOk = () => {
  //  setIsModalOpen(false);
 };

 const handleCancelData =()=>{
  setModalFitlering(false)
 }
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
      <ModalPopup 
          title = {'Điều kiện lọc'}
          isOpen = {isOpenModalFitltering}
          handleOk = {handleOk}
          handleCancelData = {handleCancelData}
      >
          <div className={styles['modal']}>
              <div className={styles['createdUser']}>
                <div className={styles['itemcontainer']}>
                  <span>Người tạo</span>
                  <Select 
                    {...selectProps}
                  />
                </div>
              </div>

              <div className={styles['updatedUser']}>
                <div className={styles['itemcontainer']}>
                  <span>Người cập nhật</span>
                  <Select 
                    {...selectProps}
                  />
                </div>
              </div>
              
              <div className={styles['createdDate']}>
                <div className={styles['itemcontainer']}>
                  <span>Ngày tạo</span>
                  <Select 
                    {...selectProps}
                  />
                </div>
              </div>

              <div className={styles['updatedDate']}>
                <div className={styles['itemcontainer']}>
                  <span>Ngày cập nhật</span>
                  <Select 
                    {...selectProps}
                  />
                </div>
              </div>
          </div>
      </ModalPopup>
    </>
  )
}



export default Filtering
