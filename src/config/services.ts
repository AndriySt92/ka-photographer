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
    description: 'Персональна історія в кадрі, створена саме для вас',
  },
  {
    title: 'Love Story',
    value: 'love-story',
    img: servicesLoveStory,
    path: '/services/love-story',
    description: 'Щирі моменти вашої любовної історії разом',
  },
  {
    title: 'Експрес зйомка',
    value: 'express',
    img: servicesExpress,
    path: '/services/express',
    description: 'Швидкі та якісні фото для ваших особливих моментів',
  },
  {
    title: 'Групова зйомка',
    value: 'group',
    img: servicesGroup,
    path: '/services/group',
    description: 'Спільні емоції та моменти, які хочеться зберегти',
  },
];

export default services;
