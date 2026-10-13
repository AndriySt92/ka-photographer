import { facebook, instagram, telegram } from '../assets/icons';

const socialMediaPlatforms = [
  {
    name: 'Telegram',
    icon: telegram,
    link: import.meta.env.VITE_TELEGRAM_LINK,
  },
  {
    name: 'Facebook',
    icon: facebook,
    link: import.meta.env.VITE_FACEBOOK_LINK,
  },
  {
    name: 'Instagram',
    icon: instagram,
    link: import.meta.env.VITE_INSTAGRAM_LINK,
  },
];

export default socialMediaPlatforms;
