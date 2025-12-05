import { Slide, ToastContainer } from 'react-toastify';

import AppRoutes from './router/AppRoutes';

const App = () => {
  return (
    <>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnHover
        theme="dark"
        transition={Slide}
        toastClassName="bg-gradient-to-r from-accent/40 py-5 to-primary backdrop-blur-lg"
        progressClassName="!bg-accent"
      />
    </>
  );
};

export default App;
