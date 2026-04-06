import { arrowTop } from '@/assets';
import { useScrollToTopVisibility } from '@/hooks';
import { cn } from '@/lib';

import { Button } from '../Button';
import Icon from '../Icon';

const ScrollToTopButton = () => {
  const showScrollTop = useScrollToTopVisibility();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(
        'group relative flex items-center justify-center rounded-full',
        showScrollTop ? 'translate-x-0 opacity-100' : 'translate-x-[170%] opacity-0',
        'transition-all duration-300',
      )}
      data-testid="scroll-to-top-container"
    >
      {/* Larger black background */}
      <div
        className="absolute inset-0 -z-10 rounded-full bg-black transition-all duration-300 group-hover:scale-100 group-active:scale-90"
        data-testid="background"
      />

      <Button size="iconLg" intent="secondary" onClick={scrollToTop} className="relative z-10">
        <Icon icon={arrowTop} name="arrow-top" size="h-9 lg:h-12 aspect-square" className="mt-2" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
