import { Link } from 'react-router-dom';

import { navigation } from '@/config';
import { useCurrentUser, useLogout } from '@/hooks';

import { DesktopNav, Logo, MobileNav } from './components';

const Header = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { data: user } = useCurrentUser();

  const isAdmin = user?.role === 'admin';

  const onLogout = () => {
    logout();
  };

  return (
    <header className="custom-blur fixed left-0 right-0 top-0 z-[100] flex items-center shadow-md">
      <div className="container flex w-full items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center">
          <DesktopNav
            navigation={navigation}
            isAdmin={isAdmin}
            onLogout={onLogout}
            isLoggingOut={isLoggingOut}
          />
          <MobileNav
            navigation={navigation}
            isAdmin={isAdmin}
            onLogout={onLogout}
            isLoggingOut={isLoggingOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
