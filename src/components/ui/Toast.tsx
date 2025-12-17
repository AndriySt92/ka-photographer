import { ToastContainer } from 'react-toastify';

import { toastConfig } from '@/config';

import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer
      {...toastConfig.container}
      toastClassName={toastConfig.classes.toast}
      progressClassName={toastConfig.classes.progress}
    />
  );
};

export default Toast;
