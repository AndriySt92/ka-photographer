import { BackgroundGradient, Circles, Typography } from '../../../../components';
import { cn, expandFadeIn, fadeInRight, staggerContainer } from '../../../../lib';

interface TextCirclesProps {
  text?: string[];
  className?: string;
}

const TextCircles = ({ text = [], className = '' }: TextCirclesProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full max-h-[193px] items-center lg:max-h-[193px] xl:max-h-[213px] 2xl:max-h-[263px]',
        className,
      )}
    >
      {/* Circles */}
      <Circles />

      <div className="relative h-[50%] w-full lg:ml-[49px] xl:ml-[54px] 2xl:ml-[65px]">
        <div className="absolute flex h-full w-full items-center overflow-hidden rounded-s-full">
          {/* Gradient */}
          <BackgroundGradient animated motionProps={{ variants: expandFadeIn }} />
          {/* Text */}
          <Typography
            size="custom"
            className="absolute z-10 pl-8 text-xs !leading-[1.2] xl:whitespace-nowrap xl:pl-8 xl:text-sm 2xl:pl-8 2xl:text-base"
            font="secondary"
            content={text}
            animated
            parentMotionProps={{
              variants: staggerContainer(0, 0.3),
            }}
            childrenVariants={fadeInRight}
          />
        </div>
      </div>
    </div>
  );
};

export default TextCircles;
