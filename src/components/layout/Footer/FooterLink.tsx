import { Link } from 'react-router-dom';

import { Typography } from '../../ui';

interface FooterLinkProps {
  to: string;
  children: string;
}

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <Link
    to={to}
    className="p-1 opacity-80 transition-all duration-300 hover:bg-accent/40 hover:opacity-100"
  >
    <Typography parentAs="span" size="lg">
      {children}
    </Typography>
  </Link>
);
export default FooterLink;
