import {
  servicesExpress,
  servicesGroup,
  servicesIndividual,
  servicesLoveStory,
} from '../assets/images';
import type { ServicesItem } from '../types';

const services: ServicesItem[] = [
  {
    title: 'Індивідуальна зйомка',
    value: 'individual',
    img: servicesIndividual,
    path: '/services/individual',
    description: 'Персональна історія в кадрі, створена спеціально для вас',
    icon: '👤',
  },
  {
    title: 'Love Story',
    value: 'love-story',
    img: servicesLoveStory,
    path: '/services/love-story',
    description: 'Захоплюючі моменти вашої любовної історії',
    icon: '❤️',
  },
  {
    title: 'Експрес зйомка',
    value: 'express',
    img: servicesExpress,
    path: '/services/express',
    description: 'Швидкі та якісні фото для особливих моментів',
    icon: '⚡',
  },
  {
    title: 'Групова зйомка',
    value: 'group',
    img: servicesGroup,
    path: '/services/group',
    description: 'Зберігаємо спільні емоції та взаємодію',
    icon: '👥',
  },
];

export default services;
