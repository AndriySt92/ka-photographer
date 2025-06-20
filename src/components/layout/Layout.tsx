import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer, Header, ScrollToTopButton } from './';

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <div className="relative z-50 flex min-h-screen flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
      <div className="fixed bottom-[2%] right-[2%] z-[100]">
        <ScrollToTopButton />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
