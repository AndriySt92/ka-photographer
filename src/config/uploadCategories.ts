import type { CategoriesItem } from '@/types';

import basePhotoCategories from './basePhotoCategories';

const uploadCategories: CategoriesItem[] = [
  ...basePhotoCategories,
  { value: 'gallery', label: 'Галерея' },
];

export default uploadCategories;
