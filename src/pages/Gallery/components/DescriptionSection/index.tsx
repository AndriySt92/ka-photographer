import { motion } from 'framer-motion';

import { BackgroundGradient, Circles, Typography } from '../../../../components/ui';
import { cn, expandFadeIn, fadeInLeft, fadeInRight, staggerContainer } from '../../../../lib';

const DescriptionSection = () => {
  return (
    <motion.div
      className="container space-y-6 sm:space-y-8 xl:space-y-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer()}
    >
      {/* Title */}
      <Typography parentAs="h2" size="6xl" animated parentMotionProps={{ variants: fadeInRight }}>
        Найяскравіші моменти моїх зйомок
      </Typography>

      {/* Text with gradient */}
      <div className="relative z-20">
        <div className="relative inset-0 flex h-full items-center py-3 xl:py-10 2xl:py-12">
          <BackgroundGradient
            className={cn(
              'w-[100vw]',
              'left-[calc(50%-50vw)] bg-gradient-to-l from-[#1a00ff] to-transparent [@media(min-width:1950px)]:left-0',
            )}
            animated
            motionProps={{ variants: expandFadeIn }}
          />

          <Typography
            parentAs="p"
            size="2xl"
            className="relative z-50 w-full normal-case leading-[1.1]"
            animated
            parentMotionProps={{ variants: fadeInLeft }}
          >
            Різні жанри, настрої й історії усе, що формує мій стиль. Просто гортай і відчуй
            атмосферу кожного кадру. Тут немає шаблонності лише живі миті, творчий підхід і щире
            бачення. Кожна фотографія це результат взаємодії, довіри та уваги до деталей. У кожному
            кадрі трохи кінематографу, трохи мрій і багато правди. Ця галерея не просто фото. Це
            візуальна мова, якою я розповідаю про емоції, характери та моменти, які хочеться
            зберегти.
          </Typography>
        </div>

        {/* Circles */}
        <div className="absolute left-0 top-0 z-30 h-full w-full">
          <div className="relative -top-[50%] aspect-square h-full -translate-x-[100%] xl:-translate-x-[110%] 2xl:-translate-x-[150%]">
            <Circles className="h-[200%]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DescriptionSection;
