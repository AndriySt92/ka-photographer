import { logo } from '../../../assets/icons';

const Logo = () => {
  return (
    <img
      src={logo}
      alt="logo"
      className="h-12 w-12 rounded-full object-cover opacity-85 sm:h-16 sm:w-16"
    />
  );
};

export default Logo;
