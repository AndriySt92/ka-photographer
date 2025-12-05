import type { NavItem } from '@/types';

import ROUTES from './routes';

const navigation: NavItem[] = [
  { label: 'Головна', path: ROUTES.HOME },
  {
    label: 'Послуги',
    path: ROUTES.SERVICES,
    children: [
      { label: 'Індивідуальна зйомка', path: `${ROUTES.SERVICES}/individual` },
      { label: 'Love Story', path: `${ROUTES.SERVICES}/love-story` },
      { label: 'Експрес зйомка', path: `${ROUTES.SERVICES}/express` },
      { label: 'Групова зйомка', path: `${ROUTES.SERVICES}/group` },
    ],
  },
  { label: 'Умови', path: ROUTES.TERMS },
  { label: 'Контакти', path: ROUTES.CONTACTS },
  { label: 'Галерея', path: ROUTES.GALLERY },
  { label: 'Адмін', path: ROUTES.ADMIN_PANEL, adminOnly: true },
];

export default navigation;
