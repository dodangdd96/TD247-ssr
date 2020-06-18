import { notification } from 'antd';

notification.config({
  placement: 'bottomRight',
  duration: 1.5,
})

export default {
  success: (message, description) => {
    notification.success({
      className: 'ant-notification-success',
      message,
      description
    })
  },

  error: (message, description) =>  {
    notification.error({
      className: 'ant-notification-error',
      message,
      description
    })
  },

  warning: (message, description) => {
    notification.warning({
      className: 'ant-notification-warning',
      message,
      description
    })
  }
}
