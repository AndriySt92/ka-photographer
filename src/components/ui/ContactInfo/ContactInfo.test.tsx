import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import { socialMediaPlatforms } from '@/config';
import type { ContactInfoItem } from '@/types';

import Icon from '../Icon';
import Typography from '../Typography';

import ContactInfo from './';

jest.mock('../Typography', () => {
  const { MockTypography } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockTypography,
  };
});

jest.mock('../Icon', () => {
  const { MockIcon } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockIcon,
  };
});

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
  };
});

jest.mock('@/config', () => {
  const { mockSocialMediaPlatforms } = jest.requireActual('tests');

  return {
    socialMediaPlatforms: mockSocialMediaPlatforms,
  };
});

jest.mock('@/lib', () => {
  const { mockCn, createMockVariants } = jest.requireActual('tests');

  return {
    buttonTextVariants: createMockVariants(),
    cn: mockCn,
  };
});

const { mockContactItems, mockContactInfoRoleStyles } = jest.requireActual('tests');

describe('ContactInfo', () => {
  const MockIcon = Icon as unknown as jest.Mock;
  const MockTypography = Typography as unknown as jest.Mock;

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
      size: mockContactInfoRoleStyles.footer.iconSize,
    });

    expect(contactIconCalls[0][0]).toMatchObject(expectedContactProps('phone', 'phone-icon'));
    expect(contactIconCalls[1][0]).toMatchObject(expectedContactProps('email', 'email-icon'));
    expect(contactIconCalls[2][0]).toMatchObject(expectedContactProps('location', 'location-icon'));

    const socialIconCalls = iconCalls.slice(3);
    expect(socialIconCalls[0][0]).toMatchObject({
      name: 'facebook',
      icon: 'fb-icon',
      size: mockContactInfoRoleStyles.footer.iconSize,
      as: 'link',
      link: 'https://fb.com',
    });
    expect(socialIconCalls[1][0]).toMatchObject({
      name: 'instagram',
      icon: 'ig-icon',
      size: mockContactInfoRoleStyles.footer.iconSize,
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
    expect(phonePropsContacts.className).toContain(
      mockContactInfoRoleStyles.contacts.containerClasses,
    );

    const socialContainer = screen.getByTestId('social-media-container');
    expect(socialContainer).toHaveClass(mockContactInfoRoleStyles.contacts.socialWrapperClasses);

    rerender(<ContactInfo items={mockContactItems} role="footer" />);

    const phonePropsFooter = getLastCallForTestId('contact-item-phone');
    expect(phonePropsFooter.className).toContain(mockContactInfoRoleStyles.footer.containerClasses);

    const footerSocialContainer = screen.getByTestId('social-media-container');
    expect(footerSocialContainer).toHaveClass(
      mockContactInfoRoleStyles.footer.socialWrapperClasses,
    );
  });

  it('handles location type correctly (splits by newline)', () => {
    render(<ContactInfo items={[mockContactItems[2]]} role="footer" />);

    const typographyCalls = MockTypography.mock.calls;
    expect(typographyCalls).toHaveLength(1);
    const props = typographyCalls[0][0];
    expect(props).toMatchObject({
      content: ['123 Main St', 'City, Country'],
      size: mockContactInfoRoleStyles.footer.textSize,
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

    (mockContactItems as ContactInfoItem[]).forEach((item, index) => {
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
