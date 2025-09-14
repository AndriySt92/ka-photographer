import { motion } from 'framer-motion';

import { BackgroundGradient, ContactInfo, SessionOrderForm, Typography } from '@/components';
import { contactInfo } from '@/config';
import { expandFadeIn, fadeIn, fadeInLeft, fadeInWithOpacity, staggerContainer } from '@/lib';

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
          >
            Контакти
          </Typography>
          <Typography
            parentAs="p"
            size="custom"
            className="hidden text-right !leading-[0.8] tracking-wider sm:block md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            animated
            parentMotionProps={{ variants: fadeInLeft }}
          >
            Фотографа кугіт анастасії
          </Typography>
        </div>

        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-0">
          {/* Contacts info section */}
          <div className="order-2 mx-auto w-full max-w-[500px] sm:order-1 sm:mx-0 sm:w-[40%] sm:max-w-none lg:w-[37%] xl:w-[37%]">
            {/* Title */}
            <motion.div
              variants={staggerContainer(0.8, 0, 1)}
              className="pointer-events-none relative mb-2 flex items-center sm:mb-4 sm:py-1 xl:mb-7"
            >
              {/* Gradient overlay */}
              <BackgroundGradient
                animated
                motionProps={{ variants: expandFadeIn }}
                className="right-0 w-full [@media(max-width:550px)]:right-[5%] [@media(max-width:550px)]:w-[100vw]"
              />

              <Typography
                parentAs="h3"
                size="2xl"
                className="relative z-20 ml-2 2xl:text-3xl"
                animated
                parentMotionProps={{ variants: fadeIn }}
              >
                Як ми можемо зв’язатися
              </Typography>
            </motion.div>

            {/* Contacts info */}
            <ContactInfo role="contacts" items={contactInfo} variants={fadeInWithOpacity} />
          </div>

          {/* Contacts form section */}
          <div className="order-1 mx-auto w-full max-w-[500px] sm:order-2 sm:mx-0 sm:w-[45%] sm:max-w-none lg:w-[39%] xl:w-[37%]">
            {/* Title */}
            <motion.div
              variants={staggerContainer(0, 0, 1)}
              className="relative mb-6 flex items-center sm:mb-9 xl:mb-14"
            >
              {/* Gradient overlay */}
              <BackgroundGradient
                animated
                motionProps={{ variants: expandFadeIn }}
                className="right-0 w-full [@media(max-width:550px)]:right-[5%] [@media(max-width:550px)]:w-[100vw]"
              />

              <Typography
                parentAs="h3"
                size="2xl"
                className="relative z-20 ml-2 2xl:text-3xl"
                animated
                parentMotionProps={{ variants: fadeIn }}
              >
                Залишай запит
              </Typography>
            </motion.div>

            {/* Contacts form */}
            <SessionOrderForm className="gap-5 sm:gap-9" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactsSection;
