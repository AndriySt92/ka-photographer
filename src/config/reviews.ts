import {
  client_1_review_1,
  client_1_review_2,
  client_2_review_1,
  client_3_review_1,
  client_avatar_1,
  client_avatar_2,
  client_avatar_3,
} from '../assets/images';
import type { ReviewSlide } from '../types';

const reviews: ReviewSlide[] = [
  [
    { avatar: client_avatar_1, items: [client_1_review_1, client_1_review_2] },
    { avatar: client_avatar_2, items: [client_2_review_1] },
    { avatar: client_avatar_3, items: [client_3_review_1] },
  ],
  [
    { avatar: client_avatar_2, items: [client_2_review_1] },
    { avatar: client_avatar_3, items: [client_3_review_1] },
    { avatar: client_avatar_1, items: [client_1_review_1, client_1_review_2] },
  ],
  [
    { avatar: client_avatar_1, items: [client_2_review_1] },
    { avatar: client_avatar_3, items: [client_3_review_1] },
    { avatar: client_avatar_2, items: [client_1_review_1, client_1_review_2] },
  ],
];

export default reviews;
