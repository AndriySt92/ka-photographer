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
    img: servicesIndividual,
    path: '/services/individual',
  },
  {
    title: 'Love Story',
    img: servicesLoveStory,
    path: '/services/love-story',
  },
  {
    title: 'Експрес зйомка',
    img: servicesExpress,
    path: '/services/express',
  },
  {
    title: 'Групова зйомка',
    img: servicesGroup,
    path: '/services/group',
  },
];

export default services;
