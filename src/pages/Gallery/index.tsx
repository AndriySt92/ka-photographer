import { galleryBanner } from '../../assets/images';
import { ShowcasePageLayout } from '../../components/sections';

import { GalleryBannerContent } from './components/';

const recentPhotos = [
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776819/gallery/csjskg3oetcw8rq1nt9j.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776818/gallery/zwcrpiw6nwbvg84pin2c.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776820/gallery/dyutpcrrhislo91muxfb.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776836/gallery/j0go7yvutuoo92eyyewi.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776835/gallery/ss6apv5v5bgmlewkjxas.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776836/gallery/tmwlhhnplec7jfkwigwf.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776819/gallery/liwqgefc2n1xtgyzfurc.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776818/gallery/atr5tmge4jwiv8dgu6tg.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776818/gallery/lfddeznoalurgfvy7gvs.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776835/gallery/kzeafajrxecptliarvgf.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776835/gallery/aq9ggtimrrq8fm5ozeab.webp',
  'https://res.cloudinary.com/drcptrml4/image/upload/v1750776837/gallery/uz2dm1q6669w5llvf4d8.webp',
];

const Gallery = () => {
  const description =
    'Різні жанри, настрої й історії усе, що формує мій стиль. Просто гортай і відчуй атмосферу кожного кадру. Тут немає шаблонності лише живі миті, творчий підхід і щире бачення. Кожна фотографія це результат взаємодії, довіри та уваги до деталей. У кожному кадрі трохи кінематографу, трохи мрій і багато правди. Ця галерея не просто фото. Це візуальна мова, якою я розповідаю про емоції, характери та моменти, які хочеться зберегти.';

  return (
    <ShowcasePageLayout
      galleryProps={{ photosUrls: recentPhotos }}
      descriptionProps={{ description: description, title: 'Найяскравіші моменти моїх зйомок' }}
      bannerProps={{
        bannerPhoto: galleryBanner,
        imageClassName: 'object-[36%_0%] sm:object-[0%_0%]',
      }}
    >
      {/* Banner text */}
      <GalleryBannerContent />
    </ShowcasePageLayout>
  );
};

export default Gallery;
