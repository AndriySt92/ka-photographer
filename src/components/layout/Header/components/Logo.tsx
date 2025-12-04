import { logo } from '@/assets';
import { Icon } from '@/components';

const Logo = () => {
  return (
    <div className="opacity-80 transition-opacity duration-300 hover:opacity-100">
      <Icon icon={logo} size="h-9 md:h-10 lg:h-11 2xl:h-12 aspect-square" name="logo" />
    </div>
  );
};

export default Logo;
