import { cn } from '@/lib';

interface IconProps {
  name: string;
  icon: string;
  size?: string;
  className?: string;
  as?: 'icon' | 'link';
  link?: string;
}

export const Icon = ({
  name,
  link,
  icon,
  size = 'w-5 h-5 xl:h-7 xl:w-7 2xl:h-9 2xl:w-9',
  className,
  as = 'icon',
}: IconProps) => {
  const commonClasses = cn(
    'flex flex-shrink-0 items-center justify-center overflow-hidden',
    as === 'link' && 'cursor-pointer duration-300 hover:scale-110',
    size,
    className,
  );

  const iconContent = <img src={icon} alt={name} className="h-full w-full object-contain" />;

  if (as === 'link' && link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className={commonClasses}
      >
        {iconContent}
      </a>
    );
  }

  // Static icon (non-interactive)
  return <span className={commonClasses}>{iconContent}</span>;
};

export default Icon;
