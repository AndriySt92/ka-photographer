import { Link } from 'react-router-dom';

import { cn } from '../../lib';

import { Typography } from '.';

interface NavLinkProps {
  to: string;
  children: string;
  className: string;
  textSize?: 'lg' | 'base';
  font?: 'secondary' | 'primary';
}

const NavLink = ({ to, children, className, textSize = 'lg', font = 'primary' }: NavLinkProps) => (
  <Link to={to} className={cn('transition-all duration-300 hover:bg-accent/40', className)}>
    <Typography parentAs="span" size={textSize} font={font}>
      {children}
    </Typography>
  </Link>
);
export default NavLink;
