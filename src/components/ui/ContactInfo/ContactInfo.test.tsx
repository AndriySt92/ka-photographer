import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import { socialMediaPlatforms } from '@/config';
import type { ContactInfoItem } from '@/types';

import Icon from '../Icon';
import Typography from '../Typography';

import ContactInfo from './';

const mockContactItems: ContactInfoItem[] = [
  { type: 'phone', icon: 'phone-icon', value: '+123456789' },
  { type: 'email', icon: 'email-icon', value: 'test@example.com' },
  { type: 'location', icon: 'location-icon', value: '123 Main St\nCity, Country' },
];

jest.mock('../Icon', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ name, size, link, as }) => (
    <div data-testid={`icon-${name}`} data-size={size} data-link={link} data-as={as}>
      {name}
    </div>
  )),
}));

jest.mock('../Typography', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(({ children, content, size, parentAs, childrenClasses, className }) => (
      <div
        data-testid="typography"
        data-size={size}
        data-parent={parentAs}
        data-children-classes={JSON.stringify(childrenClasses)}
        className={className}
      >
        {content ? content.join(' ') : children}
      </div>
    )),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn().mockImplementation(({ children, ...props }) => <div {...props}>{children}</div>),
  },
}));

jest.mock('@/config', () => ({
  socialMediaPlatforms: [
    { name: 'facebook', link: 'https://fb.com', icon: 'fb-icon' },
    { name: 'instagram', link: 'https://ig.com', icon: 'ig-icon' },
  ],
}));

jest.mock('@/lib', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

const MockIcon = Icon as unknown as jest.Mock;
const MockTypography = Typography as unknown as jest.Mock;

type Role = 'contacts' | 'footer' | 'menu';
const ROLE_STYLES: Record<
  Role,
  {
    iconSize: string;
    textSize: 'sm' | 'lg' | 'xl';
    containerClasses: string;
    textWrapperClasses: string;
    socialWrapperClasses: string;
  }
> = {
  contacts: {
    iconSize: 'h-7 w-7 xl:h-10 xl:w-10',
    textSize: 'xl',
    containerClasses: 'section-border-b py-3 sm:py-5 xl:py-7',
    textWrapperClasses: 'pointer-events-auto ml-3 xl:ml-7',
    socialWrapperClasses: 'mt-4 sm:mt-5 xl:mt-7',
  },
  footer: {
    iconSize: 'h-5 w-5 xl:h-8 xl:w-8',
    textSize: 'lg',
    containerClasses: 'sm:py-1',
    textWrapperClasses:
      'ml-2 xl:ml-3 w-fit rounded-sm opacity-80 px-1 py-1 transition-all duration-300 hover:bg-accent/40 hover:opacity-100',
    socialWrapperClasses: 'mt-2 xl:mt-3',
  },
  menu: {
    iconSize: 'h-6 w-6',
    textSize: 'lg',
    containerClasses: 'section-border-b py-2',
    textWrapperClasses:
      'ml-2 w-fit px-1 py-1 transition-all duration-300 hover:bg-accent/40 hover:opacity-100',
    socialWrapperClasses: 'mt-2 xl:mt-3',
  },
};

describe('ContactInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all contact items and social media icons for given role', () => {
    render(<ContactInfo items={mockContactItems} role="footer" />);

    expect(screen.getByTestId('contact-item-phone')).toBeInTheDocument();
    expect(screen.getByTestId('contact-item-email')).toBeInTheDocument();
    expect(screen.getByTestId('contact-item-location')).toBeInTheDocument();

    expect(screen.getByTestId('icon-facebook')).toBeInTheDocument();
    expect(screen.getByTestId('icon-instagram')).toBeInTheDocument();

    // Verify total Icon calls
    expect(MockIcon).toHaveBeenCalledTimes(3 + socialMediaPlatforms.length); // 3 contact + 2 social

    const iconCalls = MockIcon.mock.calls;
    const contactIconCalls = iconCalls.slice(0, 3);
    const expectedContactProps = (type: string, icon: string) => ({
      name: type,
      icon: icon,
      size: ROLE_STYLES.footer.iconSize,
    });

    expect(contactIconCalls[0][0]).toMatchObject(expectedContactProps('phone', 'phone-icon'));
    expect(contactIconCalls[1][0]).toMatchObject(expectedContactProps('email', 'email-icon'));
    expect(contactIconCalls[2][0]).toMatchObject(expectedContactProps('location', 'location-icon'));

    const socialIconCalls = iconCalls.slice(3);
    expect(socialIconCalls[0][0]).toMatchObject({
      name: 'facebook',
      icon: 'fb-icon',
      size: ROLE_STYLES.footer.iconSize,
      as: 'link',
      link: 'https://fb.com',
    });
    expect(socialIconCalls[1][0]).toMatchObject({
      name: 'instagram',
      icon: 'ig-icon',
      size: ROLE_STYLES.footer.iconSize,
      as: 'link',
      link: 'https://ig.com',
    });

    // Verify Typography calls for each item
    expect(MockTypography).toHaveBeenCalledTimes(3);
  });

  it('applies role-specific styles correctly', () => {
    const { rerender } = render(<ContactInfo items={mockContactItems} role="contacts" />);

    const motionDivMock = motion.div as unknown as jest.Mock;

    const getLastCallForTestId = (testId: string) => {
      const calls = motionDivMock.mock.calls;
      for (let i = calls.length - 1; i >= 0; i--) {
        if (calls[i][0]?.['data-testid'] === testId) {
          return calls[i][0];
        }
      }
      return null;
    };

    const phonePropsContacts = getLastCallForTestId('contact-item-phone');
    expect(phonePropsContacts.className).toContain(ROLE_STYLES.contacts.containerClasses);

    const socialContainer = screen.getByTestId('social-media-container');
    expect(socialContainer).toHaveClass(ROLE_STYLES.contacts.socialWrapperClasses);

    rerender(<ContactInfo items={mockContactItems} role="footer" />);

    const phonePropsFooter = getLastCallForTestId('contact-item-phone');
    expect(phonePropsFooter.className).toContain(ROLE_STYLES.footer.containerClasses);

    const footerSocialContainer = screen.getByTestId('social-media-container');
    expect(footerSocialContainer).toHaveClass(ROLE_STYLES.footer.socialWrapperClasses);
  });

  it('handles location type correctly (splits by newline)', () => {
    render(<ContactInfo items={[mockContactItems[2]]} role="footer" />);

    const typographyCalls = MockTypography.mock.calls;
    expect(typographyCalls).toHaveLength(1);
    const props = typographyCalls[0][0];
    expect(props).toMatchObject({
      content: ['123 Main St', 'City, Country'],
      size: ROLE_STYLES.footer.textSize,
    });
    expect(props['data-testid']).toBe('location-typography-location');
  });

  it('renders phone and email as links with correct href', () => {
    render(<ContactInfo items={mockContactItems} role="footer" />);

    const phoneLink = screen.getByTestId('contact-link-phone');
    expect(phoneLink).toHaveAttribute('href', 'tel:+123456789');

    const emailLink = screen.getByTestId('contact-link-email');
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');

    expect(screen.queryByTestId('contact-link-location')).not.toBeInTheDocument();
  });

  it('passes variants and custom to motion.div for animation', () => {
    const variants = { hidden: {}, visible: {} };
    render(<ContactInfo items={mockContactItems} role="footer" variants={variants} />);

    const motionDivMock = motion.div as unknown as jest.Mock;

    const findCallByTestId = (testId: string) => {
      return motionDivMock.mock.calls.find((call) => call[0]?.['data-testid'] === testId)?.[0];
    };

    mockContactItems.forEach((item, index) => {
      const props = findCallByTestId(`contact-item-${item.type}`);
      expect(props).toBeDefined();
      expect(props.variants).toBe(variants);
      expect(props.custom).toBe(index);
    });

    const socialProps = findCallByTestId('social-item-facebook');
    expect(socialProps).toHaveProperty('initial');
    expect(socialProps).toHaveProperty('whileInView');
  });

  it('applies custom className to root container', () => {
    const customClass = 'my-custom-class';
    render(<ContactInfo items={mockContactItems} role="footer" className={customClass} />);

    const container = screen.getByTestId('contact-info-container');
    expect(container).toHaveClass(customClass);
  });

  it('renders nothing when items array is empty', () => {
    render(<ContactInfo items={[]} role="footer" />);

    expect(screen.getByTestId('contact-info-container')).toBeInTheDocument();
    expect(screen.queryByTestId(/contact-item-/)).not.toBeInTheDocument();
    expect(screen.getByTestId('social-media-container')).toBeInTheDocument();
  });

  it('handles location-specific hover class for footer role', () => {
    render(<ContactInfo items={[mockContactItems[2]]} role="footer" />);

    const locationContent = screen.getByTestId('contact-content-location');
    expect(locationContent).toHaveClass('hover:bg-transparent');
    expect(locationContent).toHaveClass('hover:opacity-80');

    render(<ContactInfo items={[mockContactItems[0]]} role="footer" />);
    const phoneContent = screen.getByTestId('contact-content-phone');
    expect(phoneContent).not.toHaveClass('hover:bg-transparent');
  });
});
