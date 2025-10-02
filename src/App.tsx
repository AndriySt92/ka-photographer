import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import {
  AdminLogin,
  Contacts,
  Gallery,
  Home,
  ServiceDetails,
  Services,
  Terms,
  UploadPhotos,
} from './pages';

const App = () => {
  return (
    // <Home />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/services/:type" element={<ServiceDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/upload-photos" element={<UploadPhotos />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Route>
    </Routes>
  );
};

export default App;
