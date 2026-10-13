import { motion } from 'framer-motion';

import { cancel, online, payment } from '@/assets';
import { Icon, Typography } from '@/components';
import { fadeInLeft } from '@/lib';

const additionalInfoItems = [
  { text: 'Попередня оплата 50%', icon: payment, title: 'Попередня оплата' },
  { text: 'Скасування за 1 дні', icon: cancel, title: 'Скасування' },
  { text: 'Фото надаються онлайн', icon: online, title: 'Онлайн фото' },
];

const AdditionalInfoItem = ({
  text,
  icon,
  title,
}: {
  text: string;
  icon: string;
  title: string;
}) => (
  <div className="section-border flex flex-col items-center rounded-2xl bg-primary p-6 backdrop-blur-sm">
    <div className="mb-3 text-3xl">
      {' '}
      <Icon name={title} icon={icon} size="h-8 w-8" />
    </div>

    <Typography parentAs="h3" size="base" align="center" className="normal-case opacity-80">
      {text}
    </Typography>
  </div>
);

const AdditionalInfo = () => {
  return (
    <motion.div
      className="section-border rounded-3xl bg-gradient-to-r from-primary to-accent/40 p-6 text-center sm:p-8 md:p-12"
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Typography
        parentAs="h2"
        weight="semibold"
        size="2xl"
        align="center"
        className="mb-6 sm:mb-8"
      >
        Важливо знати перед зйомкою
      </Typography>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {additionalInfoItems.map(({ icon, text, title }) => (
          <AdditionalInfoItem key={text} icon={icon} text={text} title={title} />
        ))}
      </div>
    </motion.div>
  );
};

export default AdditionalInfo;
