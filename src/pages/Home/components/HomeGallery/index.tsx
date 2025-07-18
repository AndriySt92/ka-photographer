import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  galleryPhoto1,
  galleryPhoto2,
  galleryPhoto3,
  galleryPhoto4,
  galleryPhoto5,
  galleryPhoto6,
} from '../../../../assets/images';
import { Gallery, MButton, Typography } from '../../../../components/ui';
import { fadeInBottom, fadeInLeft } from '../../../../lib';

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
      className="space-y-6 sm:space-y-8 xl:space-y-12"
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
      <Gallery photosUrl={galleryPhotos} className="grid-cols-2" />

      {/* Button more */}
      <div className="text-center">
        <MButton as={Link} to="/gallery" size="textLg" variants={fadeInBottom}>
          Більше
        </MButton>
      </div>
    </motion.div>
  );
};

export default HomeGallery;
