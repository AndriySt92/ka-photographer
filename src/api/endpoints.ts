interface GetPhotos {
  category: string;
  limit: number;
  page: number;
}

export const endpoints = {
  photos: {
    photos: ({ category, page, limit }: GetPhotos) =>
      `/photos/?category=${category}&page=${page}&limit=${limit}`,
    uploadPhotos: '/photos',
    remove: (photoId: string) => `/photos/${photoId}`,
  },
  admin: {
    login: '/admin/login',
    logout: '/admin/logout',
    current: '/admin/current',
  },
};

export const queryKeys = {
  photos: {
    photos: (category: string) => ['photos', category],
  },
  admin: {
    current: ['admin', 'current'] as const,
  },
};
