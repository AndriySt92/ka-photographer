export const mockLink = jest.fn().mockImplementation(({ children, to, className, ...props }) => (
  <a href={to} className={className} {...props} data-testid="link">
    {children}
  </a>
));
