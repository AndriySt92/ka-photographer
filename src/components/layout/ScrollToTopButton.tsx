import { arrowTop } from '../../assets/icons';
import { useScrollToTopVisibility } from '../../hooks';

const ScrollToTopButton = () => {
  const showScrollTop = useScrollToTopVisibility();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`flex cursor-pointer items-center justify-center rounded-full border border-secondary bg-primary p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-accent/40 sm:p-2 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16 ${
        showScrollTop ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <img src={arrowTop} alt="arrow-top" className="h-full w-full object-contain p-0.5" />
    </button>
  );
};

export default ScrollToTopButton;
