import type { NavItem } from '../types';

export const navigation: NavItem[] = [
  { label: 'Головна', path: '/' },
  {
    label: 'Послуги',
    path: '/services',
    children: [
      { label: 'Індивідуальна зйомка', path: '/services/individual' },
      { label: 'Love Story', path: '/services/love-story' },
      { label: 'Експрес-зйомка', path: '/services/express' },
      { label: 'Групова зйомка', path: '/services/group' },
    ],
  },
  { label: 'Про мене', path: '/about' },
  { label: 'Відгуки', path: '/reviews' },
  { label: 'Умови', path: '/terms' },
  { label: 'Контакти', path: '/contacts' },
];

export default navigation;
