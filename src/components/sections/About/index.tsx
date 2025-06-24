import { avatar } from '../../../assets/images';
import { CursorFollower } from '../../';

// Circle Component
const Circle = ({
  size = 'md',
  children,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'max-h-[105px] max-w-[105px]',
    md: 'max-h-[213px] max-w-[213px]',
    lg: 'h-full w-full',
  };

  return (
    <div className={`rounded-full border border-secondary/40 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};

// Text Bubble Component
const TextBubble = ({ textLines, className = '' }: { textLines: string[]; className?: string }) => (
  <div className={`relative flex items-center overflow-hidden rounded-s-full ${className}`}>
    <div className="absolute h-full w-full bg-[linear-gradient(90deg,_#1a00ff_0%,_#000_100%)] opacity-40" />
    <div
      className="relative z-10 font-primary text-sm uppercase leading-[1.2] 
                   text-secondary xl:pl-8"
    >
      {textLines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  </div>
);

// About Section Component
const About = () => {
  return (
    <section className="relative bg-primary xl:pt-[48px]">
      <CursorFollower />

      <div className="container py-16">
        <div className="space-y-6 xl:space-y-16">
          {/* Title Section */}
          <div className="w-full max-w-[50%] xl:mb-6">
            <h1 className="flex justify-between font-primary font-medium uppercase leading-[0.77] text-secondary xl:text-[130px]">
              <p>Хто</p>
              <p>я?</p>
            </h1>
          </div>

          <div className="flex gap-4">
            {/* Left Column - Avatar */}
            <div className="flex-1">
              <div className="flex w-full flex-col items-center gap-10 xl:max-w-[410px]">
                <Circle size="lg" className="p-[53px]">
                  <div className="h-full w-full overflow-hidden rounded-full">
                    <img
                      src={avatar}
                      alt="Anastasiia Kugit"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Circle>

                <div className="w-full text-right">
                  <h3
                    className="font-secondary uppercase leading-tight text-secondary 
                                xl:text-[54px]"
                  >
                    Кугіт
                    <br />
                    Анастасія
                  </h3>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="relative flex flex-1 gap-10">
              <div className="space-y-10">
                {/* First Text Bubble */}
                <div className="relative -left-[76px] flex h-full items-center xl:max-h-[213px]">
                  <Circle size="md" />

                  <div className="relative flex items-center xl:py-[54px] xl:pl-[54px]">
                    <Circle size="sm" />
                    <TextBubble
                      textLines={[
                        'Привіт! Я — Анастасія,',
                        'Уже понад три роки я створюю кадри, що живуть поза межами “класики”.',
                        'Моє бачення — на перетині мистецтва, дизайну і кіно.',
                      ]}
                      className="xl:h-[105px]"
                    />
                  </div>
                </div>

                {/* Second Text Bubble */}
                <div className="relative -left-[76px] flex h-full items-center xl:-top-14 xl:max-h-[213px]">
                  <Circle size="md" />

                  <div className="relative flex items-center xl:py-[54px] xl:pl-[54px]">
                    <Circle size="sm" />
                    <TextBubble
                      textLines={[
                        'Часто працюю з тінню, простором, кольором так, як працює режисер',
                        'або художник-постановник.',
                        'Мої зйомки — це більше ніж просто “позувати”.',
                        'Це про атмосферу, настрій, рух, сенс.',
                      ]}
                      className="xl:h-[105px]"
                    />
                  </div>
                </div>

                {/* Quote */}
                <div>
                  <h3 className="font-secondary uppercase leading-tight text-secondary xl:text-[36px] ">
                    <p>“Я знімаю те,</p>
                    <p>що відчувається, а не тільки те,</p>
                    <p className="text-right">що видно.”</p>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
