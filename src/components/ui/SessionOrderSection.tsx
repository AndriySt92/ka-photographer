import { motion } from 'framer-motion';

import { MButton, SessionOrderModal, Typography } from '@/components';
import { useModal } from '@/hooks';
import { fadeInBottom, fadeInWithOpacity } from '@/lib';

const SessionOrderSection = () => {
  const { isOpenModal, openModal, closeModal } = useModal();

  return (
    <motion.div
      className="space-y-6 text-center lg:space-y-10"
      variants={fadeInBottom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="space-y-2 lg:space-y-4">
        <Typography parentAs="h3" weight="semibold" size="5xl" align="center">
          Готові створити свою історію?
        </Typography>

        <Typography parentAs="p" size="lg" align="center" className="normalcase lg:uppercase">
          Зв'яжіться з нами для обговорення деталей та бронювання дати зйомки
        </Typography>
      </div>

      {/* Button */}
      <MButton size="textLg" variants={fadeInWithOpacity} onClick={openModal}>
        Замовити зйомку
      </MButton>

      {/* Modal */}
      <SessionOrderModal onClose={closeModal} isOpen={isOpenModal} />
    </motion.div>
  );
};

export default SessionOrderSection;
