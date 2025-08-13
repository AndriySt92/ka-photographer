import { Link } from 'react-router-dom';

import { navigation } from '../../../config';

import DesktopNav from './DesktopNav';
import Logo from './Logo';

export const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-[100] flex items-center bg-primary/65 shadow-md backdrop-blur-3xl backdrop-filter">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
