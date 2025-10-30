interface PhotosByCategory {
  category: string;
  limit: number;
  page: number;
}

export const endpoints = {
  photos: {
    photos: ({ category, page, limit }: PhotosByCategory) =>
      `/photos/?${category ? `category=${category}&` : ''}page=${page}&limit=${limit}`,
    uploadPhotos: '/photos',
    remove: (photoId: string) => `/photos/${photoId}`,
  },
};

export const queryKeys = {
  photos: {
    photosByCategory: (category: string) => ['photos', category],
  },
};
