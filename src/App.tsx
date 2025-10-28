import { Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import { Layout, PrivateRoutes } from './components';
import { Contacts, Gallery, Home, ServiceDetails, Services, Terms, UploadPhotos } from './pages';

const App = () => {
  return (
    // <Home />
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/services/:type" element={<ServiceDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/upload-photos" element={<UploadPhotos />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnHover
        theme="dark"
        transition={Slide}
        toastClassName="bg-gradient-to-r from-accent/40 py-5 to-primary backdrop-blur-lg"
        progressClassName="!bg-accent"
      />
    </div>
  );
};

export default App;
