import React from 'react';

import { cn } from '../../../lib';
import { Typography } from '../../ui';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FooterSection = ({ title, children, className }: FooterSectionProps) => (
  <div className={cn('space-y-2 xl:space-y-5', className)}>
    <Typography parentAs="h6" size="2xl">
      {title}
    </Typography>
    <div className="flex flex-col">{children}</div>
  </div>
);

export default FooterSection;
