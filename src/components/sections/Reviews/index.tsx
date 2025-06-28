import { arrowLeft, arrowRight } from '../../../assets/icons';
import {
  reviews_2,
  reviews_3,
  reviews_avatar_1,
  reviews_avatar_2,
  reviews_avatar_3,
  reviews1_1,
  reviews1_2,
} from '../../../assets/images';
import { CursorFollower } from '../../';

const reviewsData = [
  {
    avatar: reviews_avatar_1,
    images: [reviews1_1, reviews1_2],
  },
  {
    avatar: reviews_avatar_2,
    images: [reviews_2],
  },
  {
    avatar: reviews_avatar_3,
    images: [reviews_3],
  },
];

const Reviews = () => {
  return (
    <section className="relative bg-primary xl:pt-[48px] 2xl:pt-[60px]">
      <CursorFollower />
      <div className="container py-16 2xl:py-20">
        <div className="space-y-6 xl:space-y-8 2xl:space-y-10">
          <h1 className="font-primary font-medium uppercase leading-[0.77] text-secondary xl:mb-20 xl:text-[130px] 2xl:mb-24 2xl:text-[160px]">
            Враження
          </h1>

          <div className="relative flex justify-between">
            {/* Reviews */}
            <div className="relative -top-[3.25rem] flex gap-6 xl:w-[40%]">
              <ArrowButton direction="left" />
              <div className="flex-1 xl:space-y-4 2xl:space-y-6">
                {reviewsData.map(({ avatar, images }, idx) => (
                  <ReviewBlock key={idx} avatar={avatar} images={images} />
                ))}
              </div>
              <ArrowButton direction="right" />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-between xl:w-[55%]">
              <div className="text-right">
                <h3 className="font-primary uppercase leading-[0.77] text-secondary xl:text-3xl 2xl:text-5xl">
                  <p>Говорять ті,</p>
                  <p>хто був по той бік</p>
                  <p>об’єктива</p>
                </h3>
              </div>

              <div className="font-primary uppercase leading-[0.77] text-secondary xl:text-lg 2xl:text-2xl">
                <p>Готові створити свою історію?</p>
                <p className="text-right">Пиши мені — і ми зробимо це разом.</p>
              </div>

              {/* Button */}
              <div className="w-fit self-end xl:pt-5 2xl:pt-9">
                <button className="pointer-events-auto rounded-full border border-secondary uppercase text-secondary transition-colors duration-300 hover:bg-accent/30 xl:px-6 xl:py-2 2xl:px-10 2xl:py-3 2xl:text-2xl">
                  Замовити
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Subcomponents
const ReviewBlock = ({ avatar, images }: { avatar: string; images: string[] }) => (
  <div className="flex gap-1">
    <div className="flex items-center justify-center overflow-hidden xl:h-10 xl:w-10 2xl:h-14 2xl:w-14">
      <img src={avatar} alt="avatar" className="h-full w-full object-contain p-0.5" />
    </div>
    <div className="mt-[12%] flex-1 space-y-2">
      {images.map((img, i) => (
        <div key={i} className="flex items-center justify-center overflow-hidden">
          <img src={img} alt={`review-${i}`} className="h-full w-full object-contain p-0.5" />
        </div>
      ))}
    </div>
  </div>
);

const ArrowButton = ({ direction }: { direction: 'left' | 'right' }) => (
  <div className="flex w-fit items-center">
    <button className="flex cursor-pointer items-center justify-center rounded-full border border-secondary bg-primary p-3 text-white transition-all duration-300 hover:scale-110 sm:p-2 xl:h-9 xl:w-9 2xl:h-14 2xl:w-14">
      <img
        src={direction === 'left' ? arrowLeft : arrowRight}
        alt={`arrow-${direction}`}
        className="h-full w-full object-contain p-0.5"
      />
    </button>
  </div>
);

export default Reviews;
