export const createMockVariants = ({ includeExit = false } = {}) => ({
  initial: {},
  animate: {},
  ...(includeExit && { exit: {} }),
});

export const mockCn = jest.fn((...args) => {
  return args
    .map((arg) => {
      if (typeof arg === 'string') return arg;
      if (typeof arg === 'object' && arg !== null) {
        return Object.keys(arg)
          .filter((key) => arg[key])
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
});

export const mockStaggerContainer = jest.fn().mockReturnValue(createMockVariants());
