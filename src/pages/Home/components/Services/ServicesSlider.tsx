import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

import { arrowLeft, arrowRight } from '@/assets';
import { Button, Icon } from '@/components';
import { fadeIn } from '@/lib';
import type { ServicesItem } from '@/types';

import ServicesCard from './ServicesCard';

interface ServicesSliderProps {
  slides: ServicesItem[];
}

const ServicesSlider = ({ slides }: ServicesSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      viewport={{ once: true, amount: 0.2 }}
      className="relative h-full"
    >
      {/* Custom Navigation Buttons */}
      <Button
        onClick={handlePrev}
        intent="minimal"
        size="iconLg"
        aria-label="Previous slide"
        as="button"
        className="absolute left-2 top-1/2 z-10 flex -translate-y-1/2 xl:hidden"
      >
        <Icon icon={arrowLeft} name="Previous" size="w-7 h-7" />
      </Button>

      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={true}
        className="h-full"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.title}>
            <ServicesCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons */}
      <Button
        onClick={handleNext}
        intent="minimal"
        size="iconLg"
        aria-label="Next slide"
        as="button"
        className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 xl:hidden "
      >
        <Icon icon={arrowRight} name="Previous" size="w-7 h-7" />
      </Button>
    </motion.div>
  );
};

export default ServicesSlider;
