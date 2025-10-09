import { motion, type Variants } from 'framer-motion';

import { socialMediaPlatforms } from '@/config';
import { cn } from '@/lib';
import type { ContactInfoItem } from '@/types';

import { Icon, Typography } from './';

type Role = 'contacts' | 'footer' | 'menu';

const ROLE_STYLES: Record<
  Role,
  {
    iconSize: string;
    textSize: 'sm' | 'lg' | 'xl';
    containerClasses: string;
    textWrapperClasses: string;
    socialWrapperClasses: string;
  }
> = {
  contacts: {
    iconSize: 'h-7 w-7 xl:h-10 xl:w-10',
    textSize: 'xl',
    containerClasses: 'border-b border-b-secondary/60 py-3 sm:py-5 xl:py-7',
    textWrapperClasses: 'pointer-events-auto ml-3 xl:ml-7',
    socialWrapperClasses: 'mt-4 sm:mt-5 xl:mt-7',
  },
  footer: {
    iconSize: 'h-5 w-5 xl:h-8 xl:w-8',
    textSize: 'lg',
    containerClasses: 'sm:py-1',
    textWrapperClasses:
      'ml-2 xl:ml-3 w-fit rounded-sm opacity-80 px-1 py-1 transition-all duration-300 hover:bg-accent/40 hover:opacity-100',
    socialWrapperClasses: 'mt-2 xl:mt-3',
  },
  menu: {
    iconSize: 'h-6 w-6',
    textSize: 'lg',
    containerClasses: 'border-b border-b-secondary/60 py-2',
    textWrapperClasses:
      'ml-2 w-fit px-1 py-1 transition-all duration-300 hover:bg-accent/40 hover:opacity-100',
    socialWrapperClasses: 'mt-2 xl:mt-3',
  },
};

interface ContactInfoProps {
  items: ContactInfoItem[];
  variants?: Variants;
  className?: string;
  role: Role;
}

const ContactInfo = ({ items, variants = {}, role, className }: ContactInfoProps) => {
  const roleStyles = ROLE_STYLES[role];

  return (
    <div className={className}>
      {items.map(({ type, icon, value }, index) => (
        <motion.div
          key={type}
          className={cn('flex items-center text-nowrap', roleStyles.containerClasses)}
          variants={variants}
          custom={index}
        >
          <Icon name={type} icon={icon} size={roleStyles.iconSize} />

          <div
            className={cn(
              roleStyles.textWrapperClasses,
              type === 'location' && role === 'footer' && 'hover:bg-transparent hover:opacity-80',
            )}
          >
            {type === 'location' ? (
              <Typography
                parentAs="div"
                size={roleStyles.textSize}
                content={value.split('\n')}
                className="!leading-none"
              />
            ) : (
              // Render phone/email as links
              <a href={type === 'phone' ? `tel:${value}` : `mailto:${value}`}>
                <Typography parentAs="div" size={roleStyles.textSize}>
                  {value}
                </Typography>
              </a>
            )}
          </div>
        </motion.div>
      ))}
      <div className={cn('flex items-center gap-6 xl:gap-10', roleStyles.socialWrapperClasses)}>
        {socialMediaPlatforms.map(({ name, link, icon }, index) => (
          <motion.div
            key={name}
            className="pointer-events-auto"
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }}
            viewport={{ once: true }}
          >
            <Icon as="link" name={name} link={link} icon={icon} size={roleStyles.iconSize} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
