import type { ContactInfoItem } from '@/types';

export const mockSocialMediaPlatforms = [
  { name: 'facebook', link: 'https://fb.com', icon: 'fb-icon' },
  { name: 'instagram', link: 'https://ig.com', icon: 'ig-icon' },
  { name: 'telegram', link: 'https://t.me', icon: 'tg-icon' },
];

export const mockNavigation = [
  { label: 'Головна', path: '/' },
  {
    label: 'Послуги',
    path: '/services',
    children: [{ label: 'Love Story', path: '/services/love' }],
  },
  { label: 'Галерея', path: '/gallery' },
  { label: 'Контакти', path: '/contacts' },
];

export const mockContactItems: ContactInfoItem[] = [
  { type: 'phone', icon: 'phone-icon', value: '+123456789' },
  { type: 'email', icon: 'email-icon', value: 'test@example.com' },
  { type: 'location', icon: 'location-icon', value: '123 Main St\nCity, Country' },
];

type Role = 'contacts' | 'footer' | 'menu';
export const mockContactInfoRoleStyles: Record<
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
