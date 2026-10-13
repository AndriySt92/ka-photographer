import { banner, bannerMobile } from '@/assets';
import { ShowcasePageLayout } from '@/components';

import { GalleryBannerContent } from './components/';

const Gallery = () => {
  const description =
    'Різні жанри, настрої й історії усе, що формує мій стиль. Просто гортай і відчуй атмосферу кожного кадру. Тут немає шаблонності лише живі миті, творчий підхід і щире бачення. Кожна фотографія це результат взаємодії, довіри та уваги до деталей. У кожному кадрі трохи кінематографу, трохи мрій і багато правди. Ця галерея не просто фото. Це візуальна мова, якою я розповідаю про емоції, характери та моменти, які хочеться зберегти.';

  return (
    <ShowcasePageLayout
      category="gallery"
      descriptionProps={{ description: description, title: 'Найяскравіші моменти моїх зйомок' }}
      bannerProps={{
        bannerPhoto: banner,
        bannerPhotoMobile: bannerMobile,
        imageClassName: 'object-[45%_0%]',
        overlayClassName: 'bg-primary/20 backdrop-blur-md',
        showGradient: false,
      }}
    >
      {/* Banner text */}
      <GalleryBannerContent />
    </ShowcasePageLayout>
  );
};

export default Gallery;
