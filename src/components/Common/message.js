import 'antd/dist/antd.css';
import { notification } from 'antd';

export const MessageCommon = {
    openNotificationSuccess,
    openNotificationError
};

function openNotificationSuccess(title) {
    notification.success({
      message: title,
      description:'',
      className: 'success-mess',
      duration: 4,
    });
};

function openNotificationError(title) {
    notification.error({
      message: title,
      description:'',
      className: 'success-mess',
      duration: 4,
    });
};