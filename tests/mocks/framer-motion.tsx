export const MockLayoutGroup = jest.fn(({ children }) => (
  <div data-testid="layout-group">{children}</div>
));

export const MockAnimatePresence = jest.fn(({ children }) => <>{children}</>);
