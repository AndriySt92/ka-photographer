import { useRef } from 'react';
import { EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

import { arrowLeft, arrowRight } from '@/assets';
import { Button, Icon } from '@/components';
import type { ReviewSlide } from '@/types';

import ReviewCard from './ReviewCard';

export interface ReviewsSliderProps {
  slides: ReviewSlide[];
}

const ReviewsSlider = ({ slides }: ReviewsSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div className="relative flex h-full items-center gap-1 sm:gap-4">
      {/* Custom Navigation Buttons */}
      <Button
        onClick={handlePrev}
        size="iconSm"
        aria-label="Previous slide"
        as="button"
        className="border-0 hover:bg-transparent lg:border"
      >
        <Icon name="arrow-left" icon={arrowLeft} size="aspect-square h-6 sm:h-8" />
      </Button>

      <Swiper
        modules={[Navigation, EffectFade]} // Added EffectFade and Autoplay modules
        // effect="fade" // Enable fade effect
        // fadeEffect={{ crossFade: true }} // Enable crossfade between slides
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={{
          clickable: true,
        }}
        className="swiper-fade"
      >
        {slides.map((slide, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            {slide.map(({ avatar, items }) => (
              <ReviewCard key={avatar} avatar={avatar} reviews={items} />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons */}
      <Button
        onClick={handleNext}
        size="iconSm"
        aria-label="Next slide"
        as="button"
        className="border-0 hover:bg-transparent lg:border"
      >
        <Icon name="arrow-right" icon={arrowRight} size="aspect-square h-6 sm:h-8" />
      </Button>
    </div>
  );
};

export default ReviewsSlider;
