import { Link } from 'react-router-dom';

import { arrowTopLeft, logout } from '@/assets';
import { Button, Icon, NavLink, Typography } from '@/components';
import type { NavItem } from '@/types';

import DesktopNavItem from './DesktopNavItem';

interface DesktopNavProps {
  navigation: NavItem[];
  onLogout: () => void;
  isLoggingOut: boolean;
  isAdmin: boolean;
}

const DesktopNav = ({ navigation, isAdmin, onLogout, isLoggingOut }: DesktopNavProps) => {
  const mainLinks = navigation.slice(0, navigation.length - 1);
  const galleryLink = navigation[navigation.length - 1];

  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="hidden h-full justify-between lg:flex">
      {mainLinks.map((item) => (
        <DesktopNavItem item={item} key={item.label} />
      ))}

      {/* Admin panel link & button logout*/}
      {isAdmin && (
        <>
          <NavLink
            to="/admin-panel"
            font="secondary"
            className="flex h-full items-center px-3 py-3"
          >
            Адмін
          </NavLink>

          <Button
            onClick={handleLogout}
            intent="minimal"
            className="ml-2 hidden px-0 py-2 opacity-80 hover:opacity-100 lg:block"
            disabled={isLoggingOut}
          >
            <Icon icon={logout} size="h-5 w-5" name="logout" />
          </Button>
        </>
      )}

      {/* Gallery link */}
      <Link
        to={galleryLink.path}
        className="group ml-[66px] flex items-center gap-3 px-3 py-3 transition-colors duration-300 hover:bg-accent/40"
      >
        <span className="relative">
          <Typography parentAs="span" size="lg" font="secondary">
            {galleryLink.label}
          </Typography>
          <span className="absolute bottom-0 left-0 h-px w-0 bg-secondary transition-all duration-300 group-hover:w-full"></span>
        </span>
        <img
          src={arrowTopLeft}
          className="h-[15px] w-[15px] text-secondary transition-all duration-300 group-hover:rotate-45"
        />
      </Link>
    </nav>
  );
};

export default DesktopNav;
