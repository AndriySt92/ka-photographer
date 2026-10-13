import type { CategoriesItem } from '@/types';

import basePhotoCategories from './basePhotoCategories';

const allPhotoCategories: CategoriesItem[] = [
  { label: 'всі фото', value: 'all' },
  { label: 'галерея', value: 'gallery' },
  ...basePhotoCategories,
];

export default allPhotoCategories;
