import React from 'react';

import { Typography } from '@/components/ui';
import { cn } from '@/lib';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FooterSection = ({ title, children, className }: FooterSectionProps) => (
  <div className={cn('space-y-2 xl:space-y-5', className)} data-testid="footer-section">
    <Typography parentAs="h6" size="2xl">
      {title}
    </Typography>
    <div className="flex flex-col" data-testid="children-wrapper">
      {children}
    </div>
  </div>
);

export default FooterSection;
