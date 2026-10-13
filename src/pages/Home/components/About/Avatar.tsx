import { motion, type Variants } from 'framer-motion';

import { avatar } from '@/assets';
import { cn } from '@/lib';

interface AvatarProps {
  className?: string;
}

const avatarImageVariants: Variants = {
  hidden: { scale: 1.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

const avatarContainerVariants: Variants = {
  hidden: {
    scale: 0.5,
    rotate: -20,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Avatar = ({ className = '' }: AvatarProps) => {
  return (
    <motion.div
      className={cn(
        'section-border aspect-square w-full overflow-hidden rounded-full lg:p-[33px] xl:p-[53px]',
        className,
      )}
      variants={avatarContainerVariants}
    >
      <div className="h-full w-full overflow-hidden rounded-full">
        <motion.img
          src={avatar}
          alt="avatar"
          className="h-full w-full rounded-full object-cover"
          variants={avatarImageVariants}
        />
      </div>
    </motion.div>
  );
};

export default Avatar;
