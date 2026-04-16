import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithRouter = (
  Component: React.ReactElement,
  { initialEntries = ['/'] } = {},
) => {
  return render(<MemoryRouter initialEntries={initialEntries}>{Component}</MemoryRouter>);
};
