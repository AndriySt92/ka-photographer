import { Link } from 'react-router-dom';

import { cn } from '@/lib';

import { Typography } from '.';

interface NavLinkProps {
  to: string;
  children: string;
  className?: string;
  textSize?: 'lg' | 'base';
  font?: 'secondary' | 'primary';
  onClick?: () => void;
}

const NavLink = ({
  to,
  children,
  className,
  textSize = 'lg',
  font = 'primary',
  onClick,
}: NavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn('transition-all duration-300 hover:bg-accent/40', className)}
  >
    <Typography parentAs="span" size={textSize} font={font}>
      {children}
    </Typography>
  </Link>
);

export default NavLink;
