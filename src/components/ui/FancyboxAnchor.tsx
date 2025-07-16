interface FancyboxAnchorProps {
  href: string;
  caption?: string;
  gallery?: string;
  className?: string;
  children?: React.ReactNode;
}

export const FancyboxAnchor = ({
  href,
  caption,
  gallery = 'gallery',
  className = '',
  children,
}: FancyboxAnchorProps) => (
  <a href={href} data-fancybox={gallery} data-caption={caption} className={className}>
    {children}
  </a>
);

export default FancyboxAnchor;
