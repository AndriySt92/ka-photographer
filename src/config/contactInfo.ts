import { email, location, phone } from '../assets/icons';
import type { ContactInfoItem } from '../types';

const contactInfo: ContactInfoItem[] = [
  {
    type: 'location',
    icon: location,
    value: 'Україна\nІвано-Франківськ, Львів',
  },
  {
    type: 'phone',
    icon: phone,
    value: import.meta.env.VITE_PHONE,
  },
  {
    type: 'email',
    icon: email,
    value: import.meta.env.VITE_EMAIL,
  },
];

export default contactInfo;
