import { email, location, phone } from '../assets/icons';

const contactInfo = [
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
