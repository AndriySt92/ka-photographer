import { Link } from 'react-router-dom';

import { cn } from '@/lib';

import Typography from '../Typography';

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
    className={cn('transition-all duration-300 pointer-fine:hover:bg-accent/40', className)}
    data-testid="nav-link"
  >
    <Typography parentAs="span" size={textSize} font={font} weight="normal">
      {children}
    </Typography>
  </Link>
);

export default NavLink;
