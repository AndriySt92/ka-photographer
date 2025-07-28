import { motion, type Variants } from 'framer-motion';

import { socialMediaPlatforms } from '../../config';
import type { ContactInfoItem } from '../../types';
import { Icon, Typography } from '../';

interface ContactInfoProps {
  items: ContactInfoItem[];
  variants?: Variants;
  className?: string;
}

const ContactInfo = ({ items, variants = {}, className }: ContactInfoProps) => {
  return (
    <div className={className}>
      {items.map(({ type, icon, value }, index) => (
        <motion.div
          key={type}
          className="flex items-center border-b border-b-secondary/80 py-3 sm:py-5 xl:py-7"
          variants={variants}
          custom={index}
        >
          <Icon name={type} icon={icon} size="h-7 w-7 xl:h-10 xl:w-10" />

          <div className="pointer-events-auto ml-3 xl:ml-7">
            {type === 'location' ? (
              <Typography
                parentAs="div"
                size="xl"
                content={value.split('\n')}
                className="normal-case !leading-none xl:uppercase"
              />
            ) : (
              // Render phone/email as links
              <a href={type === 'phone' ? `tel:${value}` : `mailto:${value}`}>
                <Typography
                  parentAs="div"
                  size="xl"
                  className="normal-case text-secondary xl:uppercase"
                >
                  {value}
                </Typography>
              </a>
            )}
          </div>
        </motion.div>
      ))}
      <div className="flex items-center gap-3 py-2 sm:py-5 xl:gap-10 xl:py-7">
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
            <Icon as="link" name={name} link={link} icon={icon} size="h-7 w-7 xl:h-10 xl:w-10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
