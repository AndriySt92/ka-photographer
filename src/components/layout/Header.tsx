import { Link } from 'react-router-dom';

import { arrowTopLeft } from '../../assets/icons';
import { navigation } from '../../config';

import { DesktopNavItem, Logo } from './components';

export const Header = () => {
  const mainLinks = navigation.slice(0, navigation.length - 1);
  const contactLink = navigation[navigation.length - 1];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center bg-primary/65 shadow-md backdrop-blur-3xl">
      <div className="container flex w-full items-center justify-between">
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <nav className="flex items-center">
          {mainLinks.map((item) => (
            <DesktopNavItem item={item} key={item.label} />
          ))}

          {/* Contacts */}
          <Link
            to={contactLink.path}
            className="group ml-[66px] flex items-center gap-3 px-3 py-6 font-body text-lg uppercase text-secondary transition-colors duration-300 hover:bg-accent/50"
          >
            <span className="relative">
              {contactLink.label}
              <span className="absolute bottom-0 left-0 h-px w-full bg-transparent transition-all duration-300 group-hover:bg-current"></span>
            </span>
            <img
              src={arrowTopLeft}
              className="h-[15px] w-[15px] text-secondary transition-all duration-300 group-hover:rotate-45"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
