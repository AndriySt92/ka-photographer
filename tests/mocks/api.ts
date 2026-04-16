export const mockEndpoints = {
  admin: {
    login: '/admin/login',
    logout: '/admin/logout',
    current: '/admin/current',
  },
  photos: {
    photos: () => '/photos',
    uploadPhotos: '/photos',
    remove: (id: string) => `/photos/${id}`,
  },
  booking: {
    create: '/bookings',
  },
};

export const mockQueryKeys = {
  admin: {
    current: ['admin', 'current'],
  },
  photos: {
    photos: (category?: string) => ['photos', category],
  },
};
