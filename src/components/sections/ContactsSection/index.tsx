import { motion } from 'framer-motion';

import { contactInfo } from '@/config';
import { fadeInLeft, fadeInWithOpacity, staggerContainer } from '@/lib';

import BackgroundGradient from '../../ui/BackgroundGradient';
import ContactInfo from '../../ui/ContactInfo';
import SessionOrderForm from '../../ui/SessionOrderForm';
import Typography from '../../ui/Typography';

interface ContactsSectionProps {
  isPage?: boolean;
}

const ContactsSection = ({ isPage }: ContactsSectionProps) => {
  const animationProps = isPage
    ? {
        initial: 'hidden',
        animate: 'visible',
      }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <motion.div
      className="pointer-events-none relative"
      variants={staggerContainer(0, 0.3, 0.2)}
      {...animationProps}
      data-testid="contacts-section-root"
    >
      <div className="space-y-12 sm:pb-10 xl:space-y-10 xl:pb-24">
        {/* Title */}
        <div>
          <Typography
            parentAs="h1"
            size="extraLarge"
            animated
            className="text-center !leading-[0.8] sm:text-left"
            parentMotionProps={{ variants: fadeInLeft }}
            data-testid="contacts-title-main"
          >
            Контакти
          </Typography>
          <Typography
            parentAs="p"
            size="custom"
            className="hidden text-right !leading-[0.8] tracking-wider sm:block md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            animated
            parentMotionProps={{ variants: fadeInLeft }}
            data-testid="contacts-title-sub"
          >
            Фотографа кугіт анастасії
          </Typography>
        </div>

        <div className="flex flex-col gap-14 sm:flex-row sm:justify-between sm:gap-0">
          {/* Contacts info section */}
          <div className="mx-auto w-full max-w-[500px] sm:order-1 sm:mx-0 sm:w-[40%] sm:max-w-none lg:w-[38%]">
            {/* Title */}
            <motion.div
              variants={fadeInLeft}
              className="pointer-events-none relative mb-2 flex items-center py-2 sm:mb-4 sm:py-1 xl:mb-7"
            >
              <BackgroundGradient className="right-0 w-full [@media(max-width:550px)]:right-[5%] [@media(max-width:550px)]:w-[100vw]" />
              <Typography
                parentAs="h3"
                size="3xl"
                className="relative z-20 ml-0 whitespace-nowrap text-xl leading-[1.1] sm:ml-2"
              >
                Як ми можемо зв’язатися
              </Typography>
            </motion.div>

            <ContactInfo role="contacts" items={contactInfo} variants={fadeInWithOpacity} />
          </div>

          {/* Contacts form section */}
          <div className="mx-auto w-full max-w-[500px] sm:order-2 sm:mx-0 sm:w-[45%] sm:max-w-none lg:w-[39%] xl:w-[37%]">
            {/* Title */}
            <motion.div
              variants={fadeInLeft}
              className="relative mb-5 flex items-center py-2 sm:mb-9 sm:py-1 xl:mb-14"
            >
              <BackgroundGradient className="right-0 w-full [@media(max-width:550px)]:right-[5%] [@media(max-width:550px)]:w-[100vw]" />
              <Typography
                parentAs="h3"
                size="3xl"
                className="relative z-20 ml-0 text-xl leading-[1.1] sm:ml-2"
              >
                Залишай запит
              </Typography>
            </motion.div>

            <SessionOrderForm className="gap-5 sm:gap-9" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactsSection;
