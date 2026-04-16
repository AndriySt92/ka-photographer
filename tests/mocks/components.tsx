export const MockErrorMessage = jest.fn(
  ({ error, size, className, animationKey: _animationKey, ...props }) => {
    if (!error) return null;

    return (
      <div data-testid="error-message" data-size={size} className={className} {...props}>
        {error}
      </div>
    );
  },
);

export const MockLoader = jest.fn(({ fullScreen: _fullScreen, ...props }) => (
  <div data-testid="loader" {...props}>
    Loading...
  </div>
));

export const MockGroupButtons = jest.fn(({ options, selectedOption, onChange, className }) => (
  <div data-testid="group-buttons" className={className}>
    {options.map((opt: { value: string; label: string }) => (
      <button
        key={opt.value}
        data-selected={opt.value === selectedOption}
        onClick={() => onChange(opt.value)}
      >
        {opt.label}
      </button>
    ))}
  </div>
));

export const MockTypography = jest.fn(
  ({
    children,
    content,
    parentAs,
    size,
    align,
    font,
    weight,
    animated,
    parentMotionProps,
    className,
    childrenVariants: _childrenVariants,
    childrenClasses: _childrenClasses,
    ...props
  }) => {
    const Tag = parentAs || 'div';

    return (
      <Tag
        data-testid="typography"
        data-parent={parentAs || ''}
        data-size={size || ''}
        data-align={align || ''}
        data-font={font}
        data-weight={weight}
        data-animated={animated ? 'true' : 'false'}
        data-motionprops={parentMotionProps ? 'present' : ''}
        className={className}
        {...props}
      >
        {content ? content.join('') : children}
      </Tag>
    );
  },
);

export const MockButton = jest.fn(
  ({ children, type, disabled, isLoading, loadingText, intent, size, ...props }) => (
    <button
      type={type}
      disabled={disabled || isLoading}
      data-testid="button"
      data-size={size}
      data-intent={intent}
      data-loading={isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  ),
);

export const MockShowcasePageLayout = jest.fn(({ children, ...props }) => (
  <div data-testid="showcase-layout" data-props={JSON.stringify(props)}>
    {children}
  </div>
));

export const MockContactsSection = jest.fn(({ isPage }) => (
  <div data-testid="contacts-section" data-is-page={isPage} />
));

export const MockCursorFollower = jest.fn(() => <div data-testid="cursor-follower" />);

export const MockHoverCircles = jest.fn(({ withLogo, className }) => (
  <div data-testid="hover-circles" data-with-logo={withLogo} className={className} />
));

export const MockModal = jest.fn(({ isOpen, onClose, title, children, withCloseButton = true }) => {
  if (!isOpen) return null;
  return (
    <div data-testid="modal" role="dialog">
      <h2>{title}</h2>
      {withCloseButton && (
        <button data-testid="modal-close" onClick={onClose}>
          ×
        </button>
      )}
      {children}
    </div>
  );
});

export const MockGoBackButton = jest.fn(() => <div data-testid="go-back-button">Back</div>);

export const MockBannerWrapper = jest.fn(
  ({
    children,
    imageSrc: _imageSrc,
    imageMotionProps: _imageMotionProps,
    wrapperMotionProps: _wrapperMotionProps,
    imageClassName: _imageClassName,
    imageSrcMobile: _imageSrcMobile,
    ...props
  }) => (
    <div data-testid="banner-wrapper" {...props}>
      {children}
    </div>
  ),
);

export const MockGallery = jest.fn(({ photos }) => (
  <div data-testid="gallery" data-photos-count={photos.length} />
));

export const MockNavLink = jest.fn(
  ({ to, children, className, onClick, 'data-testid': testId }) => (
    <a
      href={to}
      data-testid={testId || 'nav-link'}
      data-to={to}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  ),
);

export const MockDesktopNavItem = jest.fn(({ item }) => (
  <a href={item.path} data-testid="nav-link" data-to={item.path}>
    {item.label}
  </a>
));

export const MockScrollToTop = jest.fn(() => <div data-testid="scroll-to-top" />);

export const MockLogo = jest.fn(() => <div data-testid="logo" />);

export const MockFormField = jest.fn(
  ({ label, name, type = 'text', register, error, validation, ...props }) => (
    <div data-testid="form-field" data-name={name} data-label={label} data-type={type} {...props}>
      <input
        {...(register ? register(name, validation) : {})}
        type={type}
        aria-label={label}
        data-testid={`input-${name}`}
      />
      {error && <span data-testid={`error-${name}`}>{error}</span>}
    </div>
  ),
);

export const MockIcon = jest.fn(({ name, size, link, as, className, ...props }) => (
  <div
    data-testid={`icon-${name}`}
    data-size={size}
    data-link={link}
    data-as={as}
    className={className}
    {...props}
  >
    {name}
  </div>
));

export const MockSessionOrderForm = jest.fn(({ sessionType, onSubmitSuccess }) => (
  <div data-testid="session-order-form" data-session-type={sessionType}>
    <button data-testid="trigger-success" onClick={() => onSubmitSuccess && onSubmitSuccess()}>
      Submit Success
    </button>
  </div>
));

export const MockSessionOrderModal = jest.fn(
  ({ isOpen, onClose, sessionType, title = 'Замовити фотосесію' }) => {
    if (!isOpen) return null;
    return (
      <div
        data-testid="modal"
        data-onclose={onClose ? 'present' : undefined}
        data-session-type={sessionType}
        data-title={title}
      />
    );
  },
);

export const MockContactInfo = jest.fn(({ items, variants, className, role }) => (
  <div
    data-testid="contact-info-container"
    data-role={role}
    data-items={JSON.stringify(items)}
    data-variants={variants ? 'present' : undefined}
    className={className}
  />
));

export const MockBackgroundGradient = jest.fn(
  ({ className, gradient, animated, motionProps, style, ...props }) => (
    <div
      data-testid="background-gradient"
      className={className}
      data-gradient={gradient}
      data-animated={animated ? 'true' : 'false'}
      data-motionprops={motionProps ? 'present' : undefined}
      style={style}
      {...props}
    />
  ),
);

export const MockCircles = jest.fn(({ className, custom }) => (
  <div data-testid="circles" className={className} data-custom={custom} />
));

export const MockFancyboxAnchor = jest.fn(({ children, href, gallery }) => (
  <a href={href} data-gallery={gallery} data-testid="fancybox-anchor">
    {children}
  </a>
));

export const MockFancyboxLayout = jest.fn(({ children }) => (
  <div data-testid="fancybox-layout">{children}</div>
));
