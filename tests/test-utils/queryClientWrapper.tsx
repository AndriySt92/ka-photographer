import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClientWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function ({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};
