import type { ReactNode } from 'react';
import { Suspense } from 'react';

interface LazySectionProps {
  children: ReactNode;
}

const LazySection = ({ children }: LazySectionProps) => (
  <Suspense fallback={<div className="h-96 animate-pulse bg-secondary/5" />}>{children}</Suspense>
);
export default LazySection;
