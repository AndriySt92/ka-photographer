import { useParams } from 'react-router-dom';

import { expressBanner, groupBanner, individualBanner, loveStoryBanner } from '../../assets/images';
import { ShowcasePageLayout } from '../../components/sections';

import { ServiceBannerContent } from './components/';

const servicesData = {
  individual: {
    name: 'Індивідуальна зйомка',
    bannerPhoto: individualBanner,
    details: {
      price: '1500 грн',
      duration: '1 год',
      photosCount: '60-70 фотографій',
      deliveryTime: 'до 10 днів',
    },
    description:
      'Індивідуальна зйомка — це персональна історія в кадрі.\nВона підлаштована під тебе: твої ідеї, емоції та настрій.\nРазом ми обираємо концепцію, локацію та образи.\nЗйомка проходить у комфортній атмосфері, без тиску, щоб кожен кадр був щирим і природним.\nЦей формат підходить для тих, хто хоче розкритися перед камерою, зберегти важливий період у житті або просто зробити естетичні фото для себе.',
    recentPhotos: [
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775372/individual/urnvmablci1mznl1fbro.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775372/individual/gssaakrkitcysdernbq9.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775372/individual/f0uopnzzfyq3wxgzmnop.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775372/individual/vh4za1xoizfjup26v9ab.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775372/individual/bv5mv5spnnopa9ewdgy9.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775372/individual/s910nelo3f64edyzg5su.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775335/individual/qkmre6vziieokcgzkno0.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775335/individual/xrmuhx4gigjetpakmhy4.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775335/individual/kpytfe4tfqdlg597jblo.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775335/individual/avf0znmc1qwrg8w7axlq.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775335/individual/iebt5uxznrg5nrmy33b1.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775334/individual/pkhxxmnoyoduzxk12lwi.webp',
    ],
  },
  'love-story': {
    name: 'Love Story',
    bannerPhoto: loveStoryBanner,
    details: {
      price: '2000 грн',
      duration: '1 год',
      photosCount: '60-70 фото',
      deliveryTime: 'до 10 днів',
    },
    description:
      'Love Story — це серія фотозйомок, що відображають справжні історії кохання.\nЦе не просто фотографії, а живі моменти, які розповідають про почуття, близькість і важливі події у житті пари — від першої зустрічі до заручин або весілля.\nЦя категорія створена для тих, хто хоче зберегти свої найцінніші емоції у красивих, природних кадрах.',
    recentPhotos: [
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776285/love-story/epc3gctl2uc67n0xgunj.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776285/love-story/etyyubnl9eswtaj9wttp.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776286/love-story/g4rtcdyfx1xinnlb1teq.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776285/love-story/burovmnjnphjbsqlc4ao.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776285/love-story/alnduro35garkthlzcw0.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776286/love-story/l8zh4p4etzrgjfqtuzp1.jpg',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776373/love-story/bxun8tfkvzvsuek67sor.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776373/love-story/pziamzxhgpxdc1wdzdbv.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776372/love-story/soxe9hydl8ka3tmyeqtv.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776372/love-story/vsioh1zfak4pat7xwk3u.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776372/love-story/o3jouosj9ygdaoe6augt.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776372/love-story/dcux1x6wclzuwg2hrpbv.webp',
    ],
  },
  express: {
    name: 'Експрес зйомка',
    bannerPhoto: expressBanner,
    details: {
      price: '1000 грн',
      duration: '30 хв',
      photosCount: '30-40 фото',
      deliveryTime: 'до 10 днів',
    },
    description:
      'Це формат індивідуальної фотосесії, який триває приблизно 30 хвилин замість стандартної години.\nІдеально підходить, коли час обмежений, але хочеться отримати стильні та якісні фото швидко і без зайвих витрат.\nХоча тривалість зйомки коротша, я ретельно підходжу до кожного кадру, щоб у підсумку ви отримали кілька яскравих, природних і виразних світлин.\nЦя категорія — чудовий вибір для оновлення портфоліо, фото для соцмереж або подарунка близьким.',
    recentPhotos: [
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775646/express/scz31pdsjuuaoknyqw4i.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775645/express/bgnujjmgixafacf6u6gd.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775646/express/rngsarz77ojpoe9fz8n7.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775646/express/onrw6utjvdacpf0feakl.jpg',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775647/express/qugsq1jdavaaqmijijdr.jpg',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775645/express/ymb3yyz3rooff3vijyxd.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775820/express/iigkl9p5mn2nahtjwwdh.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775724/express/gydx6h1zess3x9kub90x.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775725/express/ed2ly0dfnqsjhap4muxv.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775725/express/ro5ukwujymrfznljlvie.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775730/express/qup80gym651oh9obf2dj.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750775725/express/a8snke5i9kb87lqxqdgm.webp',
    ],
  },
  group: {
    name: 'Групова зйомка',
    bannerPhoto: groupBanner,
    details: {
      price: '3000 грн',
      duration: '1-2 год',
      photosCount: '60-70 фото',
      deliveryTime: 'до 14 днів',
    },
    description:
      'Це фотосесія для компанії від 3 до 7 осіб — друзів, родини, колег або будь-якої невеликої групи.\nМета — зберегти ваші спільні емоції, взаємодію та унікальні моменти разом.\nЗйомка проходить у розслабленій і природній атмосфері, де кожен може почуватися комфортно і впевнено.\nПід час фотосесії я допомагаю з позуванням і створюю легкі, живі кадри, які розповідають вашу історію через усмішки, дотики і спільні моменти.\nГрупова зйомка — чудовий спосіб зафіксувати важливі події, дружбу чи родинні зв’язки, створити теплі спогади, які будуть гріти серце довгі роки.',
    recentPhotos: [
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776668/group/urdyxlwyfusins9vxwxy.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776669/group/tfo4i6stvtrypcvqgmuw.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776668/group/bch5vto67jaw8fxrecba.jpg',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776671/group/prut2yphhnjra1aokeff.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776668/group/urdyxlwyfusins9vxwxy.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776669/group/mvajkqzvhetjcvijy2kx.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776685/group/ond8fgzydwyelo2sxjnm.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776686/group/sb0lysjhyute9wl1ozma.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776686/group/nqolulkqa61sjxsac7rq.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776685/group/eaxkl2z9jwokkho51nmv.webp',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776669/group/o08add0jqrzu5uhkhev5.jpg',
      'https://res.cloudinary.com/drcptrml4/image/upload/v1750776686/group/uuoe1kl6mxstpf2ooihj.webp',
    ],
  },
};

const ServiceDetails = () => {
  const { type } = useParams();
  const service = servicesData[type as keyof typeof servicesData];
  const { recentPhotos, description, name, bannerPhoto, details } = service;

  return (
    <ShowcasePageLayout
      galleryProps={{ photosUrls: recentPhotos }}
      descriptionProps={{ description, title: `Що таке ${name}?` }}
      bannerProps={{ bannerPhoto }}
      motionKey={type}
    >
      {/* Banner text */}
      <ServiceBannerContent name={name} details={details} />
    </ShowcasePageLayout>
  );
};

export default ServiceDetails;
