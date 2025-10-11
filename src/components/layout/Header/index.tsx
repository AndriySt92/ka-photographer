import { Link } from 'react-router-dom';

import { navigation } from '@/config';

import DesktopNav from './DesktopNav';
import Logo from './Logo';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="dropdown-blur fixed left-0 right-0 top-0 z-[100] flex items-center shadow-md">
      <div className="container flex w-full items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center">
          <DesktopNav navigation={navigation} />
          <MobileNav navigation={navigation} />
        </div>
      </div>
    </header>
  );
};

export default Header;
