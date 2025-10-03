import { arrowTop } from '@/assets';
import { Button, Icon } from '@/components';
import { useScrollToTopVisibility } from '@/hooks';
import { cn } from '@/lib';

const ScrollToTopButton = () => {
  const showScrollTop = useScrollToTopVisibility();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      size="iconLg"
      intent="secondary"
      className={cn(showScrollTop ? 'translate-x-0 opacity-100' : 'translate-x-[170%] opacity-0')}
      onClick={scrollToTop}
    >
      <Icon icon={arrowTop} name="arrow-top" size="h-9 lg:h-12 aspect-square" className="mt-2" />
    </Button>
  );
};

export default ScrollToTopButton;
