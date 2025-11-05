import type { CategoriesItem } from '@/types';

import basePhotoCategories from './basePhotoCategories';

const allPhotoCategories: CategoriesItem[] = [
  ...basePhotoCategories,
  { label: 'галерея', value: 'gallery' },
  { label: 'всі', value: '' },
];

export default allPhotoCategories;
