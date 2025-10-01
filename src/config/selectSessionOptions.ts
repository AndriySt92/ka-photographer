import type { SessionOption } from '@/types';

import sessionOptions from './sessionOptions';

const selectSessionOptions: SessionOption[] = [
  ...sessionOptions,
  { value: 'gallery', label: 'Галерея' },
];

export default selectSessionOptions;
