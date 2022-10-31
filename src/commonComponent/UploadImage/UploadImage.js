import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { MessageCommon } from "../../Common/message";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadImage = (props) => {
  // const{fileList}=props
  const {handle_ImageChange, number_ImageAllow, title, multiple, fileList, setFileList}=props
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // const [fileList, setFileList] = useState([]);

  useEffect(()=>{
  //  console.log("xxx:",fileList)
   if( fileList.length > 0){
    if( fileList[0].thumbUrl !== undefined){
      // console.log("bbb")
      // console.log("fileList:",fileList)
      // handle_ImageChange(fileList)
     }
   }
  
  },[fileList])
  const handleCancel = () => setPreviewOpen(false);
  

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = async({fileList}) => {
    for(let i=0; i<fileList.length; i++)
    {
           if(fileList[i].status === "error")
           {
             fileList[i].status = "done"
           }
    }
    // console.log("xxx:",fileList[0].thumbUrl)
    // // handle_ImageChange(fileList)
    // console.log("fileList:", fileList)
    await setFileList(fileList)
   
    // await handle_ImageChange(fileList)
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      MessageCommon.openNotificationError('Bạn chỉ có thể upload file có định dạng JPG/PNG!')
    }
    return isJpgOrPng;
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải ảnh lên
      </div>
    </div>
  );

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        multiple={multiple}
      >
        {fileList.length >= number_ImageAllow ? null : uploadButton}
      </Upload>
      <Modal 
      open={previewOpen} 
      title={previewTitle} 
      footer={null} 
      onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadImage;