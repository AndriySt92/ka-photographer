import { logo } from '../../assets/icons';

interface HoverCirclesProps {
  withLogo?: boolean;
}

const HoverCircles = ({ withLogo = false }: HoverCirclesProps) => {
  return (
    <div className=" pointer-events-none absolute -top-[1.1%] left-0 h-[102%] w-full">
      <div className=" pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Outer circle - 110% height */}
        <div className="pointer-events-auto absolute z-10 aspect-square h-[110%] rounded-full border border-secondary/30 transition-all duration-700 hover:bg-secondary/20 group-hover:bg-secondary/20" />

        {/* Middle circle - 70% height */}
        <div className="pointer-events-auto absolute z-20 aspect-square h-[70%] rounded-full border border-secondary/30 bg-primary transition-all duration-500 hover:bg-secondary/10" />

        {/* Inner circle - 33% height */}
        <div className="pointer-events-auto absolute z-30 flex aspect-square h-1/3 items-center justify-center rounded-full border border-secondary/40 bg-primary">
          {/* Logo */}
          {withLogo && (
            <div className="flex h-[60%] w-[60%] items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="object-contain opacity-40 transition-all duration-500 hover:scale-[1.02] hover:opacity-60"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoverCircles;
