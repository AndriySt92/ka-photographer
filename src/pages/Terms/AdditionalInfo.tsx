import { motion } from 'framer-motion';

import { Typography } from '@/components';
import { fadeInLeft } from '@/lib';

const additionalInfoItems = [
  { text: 'Попередня оплата 50%', icon: '💳' },
  { text: 'Скасування за 1 дні', icon: '❌' },
  { text: 'Фото надаються онлайн', icon: '📱' },
];

const AdditionalInfoItem = ({ text, icon }: { text: string; icon: string }) => (
  <div className="section-border flex flex-col items-center rounded-2xl bg-primary p-6 backdrop-blur-sm">
    <div className="mb-3 text-3xl">{icon}</div>

    <Typography parentAs="h3" size="base" align="center" className="normal-case opacity-80">
      {text}
    </Typography>
  </div>
);

const AdditionalInfo = () => {
  return (
    <motion.div
      className="section-border rounded-3xl bg-gradient-to-r from-primary to-accent/40 p-8 text-center md:p-12"
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Typography
        parentAs="h3"
        weight="semibold"
        size="2xl"
        align="center"
        className="mb-6 sm:mb-8"
      >
        Важливо знати перед зйомкою
      </Typography>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {additionalInfoItems.map(({ icon, text }) => (
          <AdditionalInfoItem key={text} icon={icon} text={text} />
        ))}
      </div>
    </motion.div>
  );
};

export default AdditionalInfo;
