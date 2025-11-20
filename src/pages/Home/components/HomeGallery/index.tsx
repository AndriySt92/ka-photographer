import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Button, Gallery, Typography } from '@/components';
import { homePhotos } from '@/config';
import { fadeInBottom, fadeInLeft } from '@/lib';
import type { PhotoItem } from '@/types';

const HomeGallery = () => {
  return (
    <motion.div
      className="space-y-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Title */}
      <Typography
        parentAs="h1"
        size="extraLarge"
        animated
        parentMotionProps={{ variants: fadeInLeft }}
      >
        Галерея
      </Typography>

      {/* Photos */}
      <Gallery
        photos={homePhotos as PhotoItem[]}
        className="grid-cols-2"
        itemClassName="h-[260px] sm:h-[470px] lg:h-[565px]"
      />

      {/* Button more */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInBottom}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center"
      >
        <Button as={Link} to="/gallery" size="textLg">
          Більше
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HomeGallery;
