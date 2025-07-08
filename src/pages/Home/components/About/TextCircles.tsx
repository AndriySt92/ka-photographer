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
      <div className="absolute inset-y-0 left-0 w-screen overflow-visible">
        <Circles className="-translate-x-1/2" />
      </div>

      <div className="relative h-[50%] w-full lg:ml-[49px] xl:ml-[54px] 2xl:ml-[65px]">
        <div className="relative inset-0 left-1/2 z-10 flex h-full w-screen -translate-x-1/2 items-center overflow-hidden rounded-none sm:w-full sm:rounded-s-full lg:absolute">
          {/* Gradient */}
          <BackgroundGradient animated motionProps={{ variants: expandFadeIn }} />
          {/* Text */}
          <Typography
            size="custom"
            className="container relative z-10 py-3 text-base !leading-[1.2] sm:pl-8 lg:py-0 lg:text-sm xl:whitespace-nowrap xl:pl-8 2xl:pl-8 2xl:text-base"
            font="secondary"
            content={text}
            animated
            parentMotionProps={{
              variants: staggerContainer(),
            }}
            childrenVariants={fadeInRight}
          />
        </div>
      </div>
    </div>
  );
};

export default TextCircles;
