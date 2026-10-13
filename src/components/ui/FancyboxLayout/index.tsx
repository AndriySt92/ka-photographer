import type { ReactNode } from 'react';

import { useFancybox } from '@/hooks';

const FancyboxLayout = ({ children }: { children: ReactNode }) => {
  useFancybox();

  return <>{children}</>;
};

export default FancyboxLayout;
