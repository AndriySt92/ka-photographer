import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

import { arrowLeft, arrowRight } from '../../../../assets/icons';
import { Button } from '../../../../components';
import type { ServicesItem } from '../../../../types';

import ServicesCard from './ServicesCard';

interface ServicesSliderProps {
  slides: ServicesItem[];
}

const ServicesSlider = ({ slides }: ServicesSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div className="relative h-full">
      {/* Custom Navigation Buttons */}
      <Button
        onClick={handlePrev}
        intent="minimal"
        size="iconLg"
        aria-label="Previous slide"
        as="button"
        className="absolute left-2 top-1/2 z-10 flex -translate-y-1/2 xl:hidden"
      >
        <img src={arrowLeft} alt="Previous" className="h-full w-full object-contain p-0.5" />
      </Button>

      <Swiper
        modules={[Navigation]}
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
        <img src={arrowRight} alt="Previous" className="h-full w-full object-contain p-0.5" />
      </Button>
    </div>
  );
};

export default ServicesSlider;
