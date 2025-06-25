import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  servicesExpress,
  servicesGroup,
  servicesIndividual,
  servicesLoveStory,
} from '../../../assets/images';
import { useWindowSize } from '../../../hooks';

interface ServiceItem {
  title: string;
  img: string;
  path: string;
}

interface ServiceCardProps {
  item: ServiceItem;
}

const services: ServiceItem[] = [
  {
    title: 'Індивідуальна зйомка',
    img: servicesIndividual,
    path: '/services/individual',
  },
  {
    title: 'Love Story',
    img: servicesLoveStory,
    path: '/services/love-story',
  },
  {
    title: 'Експрес зйомка',
    img: servicesExpress,
    path: '/services/express',
  },
  {
    title: 'Групова зйомка',
    img: servicesGroup,
    path: '/services/group',
  },
];

const ServiceCard = ({ item }: ServiceCardProps) => {
  return (
    <Link to={item.path} className="block h-full">
      <motion.div
        className="group relative flex h-full flex-col overflow-hidden border-l border-primary"
        whileHover="hover"
        initial="rest"
      >
        {/* White overlay - visible by default */}
        <motion.div
          className="absolute inset-0 z-10 bg-white"
          variants={{
            rest: { opacity: 1 },
            hover: { opacity: 0 },
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.img})` }}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Title overlay */}
        <motion.div
          className="absolute bottom-[5%] left-0 right-0 z-20 flex justify-center text-center"
          variants={{
            rest: { y: 0 },
            hover: { y: -10 },
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.h3
            className="text-center font-primary text-xl uppercase xl:max-w-48 xl:text-2xl xl:leading-6 2xl:max-w-80 2xl:text-[36px] 2xl:!leading-10"
            variants={{
              rest: { color: '#000000' },
              hover: { color: '#FFFFFF' },
            }}
            transition={{ duration: 0.5 }}
          >
            {item.title}
          </motion.h3>
        </motion.div>
      </motion.div>
    </Link>
  );
};

const Services = () => {
  const { height } = useWindowSize();

  const getTextSize = () => {
    if (height > 800) return 'text-[7rem]';
    if (height > 700) return 'text-[6rem]';
    if (height > 600) return 'text-[5.3rem]';
    return 'text-[4.5rem]';
  };

  const textSizeClass = getTextSize();

  return (
    <section className="relative bg-primary xl:pt-[48px] 2xl:pt-[60px]">
      <div className="py-16 2xl:py-20">
        <div className="relative flex h-[90vh] max-h-[800px] w-full flex-row">
          {/* Title over services blocks */}
          <div className="pointer-events-none absolute left-0 right-0 z-20 xl:top-7 xl:pl-[40px] 2xl:top-10 2xl:pl-[60px]">
            <h2 className="font-primary text-2xl uppercase text-primary md:text-3xl xl:max-w-[40%] xl:text-[30px] xl:leading-8 2xl:max-w-[40%] 2xl:text-[45px] 2xl:!leading-[3rem]">
              Кожна зйомка — це простір для відчуттів. Обирай свій формат.
            </h2>
          </div>

          {/* Services cards */}
          <div className="grid flex-1 grid-cols-1 pt-32 md:grid-cols-2 md:pt-0 lg:grid-cols-4">
            {services.map((item) => (
              <ServiceCard key={item.title} item={item} />
            ))}
          </div>

          {/* Title aside */}
          <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gray-100 md:max-w-[15%]">
            <h1 className={`font-secondary font-medium uppercase text-primary ${textSizeClass}`}>
              {'Послуги'.split('').map((letter, index) => (
                <span key={index} className="block leading-[0.87]">
                  {letter}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
