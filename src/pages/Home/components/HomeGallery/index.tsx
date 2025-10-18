import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  galleryPhoto1,
  galleryPhoto2,
  galleryPhoto3,
  galleryPhoto4,
  galleryPhoto5,
  galleryPhoto6,
} from '@/assets';
import { Button, Gallery, Typography } from '@/components';
import { fadeInBottom, fadeInLeft } from '@/lib';

const galleryPhotos = [
  galleryPhoto1,
  galleryPhoto2,
  galleryPhoto3,
  galleryPhoto4,
  galleryPhoto5,
  galleryPhoto6,
];

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
      <Gallery photosUrls={galleryPhotos} className="grid-cols-2" />

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
