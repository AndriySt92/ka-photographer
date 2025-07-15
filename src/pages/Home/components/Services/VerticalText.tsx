import React from 'react';

import { Typography } from '../../../../components';
import { useWindowSize } from '../../../../hooks';
import { fadeInBottom, staggerContainer } from '../../../../lib';

const VerticalText = () => {
  const { height } = useWindowSize();

  const getTextSize = () => {
    if (height > 800) return 'text-[7rem]';
    if (height > 700) return 'text-[6rem]';
    if (height > 600) return 'text-[5.3rem]';
    if (height > 500) return 'text-[4.5rem]';
    return 'text-[4rem]';
  };

  const textSizeClass = getTextSize();
  return (
    <div className="hidden h-full w-full max-w-[20%] flex-col items-center justify-center overflow-hidden bg-gray-100 sm:flex md:max-w-[18%] lg:max-w-[15%]">
      <Typography
        parentAs="h1"
        content={['п', 'о', 'с', 'л', 'у', 'г', 'и']}
        size="custom"
        color="dark"
        className={`!leading-[0.87] text-primary ${textSizeClass}`}
        animated
        parentMotionProps={{ variants: staggerContainer(0, 0, 0.15) }}
        childrenVariants={fadeInBottom}
      />
    </div>
  );
};

export default VerticalText;
