import {
  reviews_1_1,
  reviews_1_2,
  reviews_2,
  reviews_3,
  reviews_avatar_1,
  reviews_avatar_2,
  reviews_avatar_3,
} from '../assets/images';
import type { ReviewSlide } from '../types';

const reviews: ReviewSlide[] = [
  [
    { avatar: reviews_avatar_1, items: [reviews_1_1, reviews_1_2] },
    { avatar: reviews_avatar_2, items: [reviews_2] },
    { avatar: reviews_avatar_3, items: [reviews_3] },
  ],
  [
    { avatar: reviews_avatar_1, items: [reviews_1_1, reviews_1_2] },
    { avatar: reviews_avatar_3, items: [reviews_3] },
    { avatar: reviews_avatar_2, items: [reviews_2] },
  ],
  [
    { avatar: reviews_avatar_2, items: [reviews_2] },
    { avatar: reviews_avatar_3, items: [reviews_3] },
    { avatar: reviews_avatar_1, items: [reviews_1_1, reviews_1_2] },
  ],
];

export default reviews;
