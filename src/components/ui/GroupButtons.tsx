import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { Button } from '../../components/ui';
import { cn } from '../../lib';

interface ButtonOption {
  label: string;
  value: string;
}

interface GroupButtonsProps {
  options: ButtonOption[];
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
}

const GroupButtons = ({ options, value, onChange, label }: GroupButtonsProps) => {
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Update underline position when value changes or component mounts
  useEffect(() => {
    if (value === null) {
      setUnderlineProps({ width: 0, left: 0 });
      return;
    }

    const activeElement = buttonRefs.current[value];
    if (activeElement) {
      const { width } = activeElement.getBoundingClientRect();
      const left = activeElement.offsetLeft;
      setUnderlineProps({ width, left });
    }
  }, [value, options]);

  return (
    <div className="relative z-[60]">
      {label && <h6 className="font-title pb-2 uppercase text-secondary 2xl:text-lg">{label}</h6>}

      <div className="relative flex justify-between border-b border-secondary/80">
        {options.map((option) => (
          <Button
            key={option.value}
            ref={(el) => {
              buttonRefs.current[option.value] = el as HTMLButtonElement;
            }}
            intent="minimal"
            onClick={() => onChange(option.value)}
            className={cn(
              'relative rounded-sm xl:px-4 xl:py-3',
              value === option.value
                ? 'text-secondary opacity-100'
                : ' text-white opacity-70 hover:bg-accent/40 hover:opacity-100',
            )}
          >
            {option.label}
          </Button>
        ))}

        {/* Animated underline */}
        <motion.div
          className="absolute bottom-[-1px] h-0.5 bg-secondary"
          initial={false}
          animate={{
            width: underlineProps.width,
            left: underlineProps.left,
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            duration: 0.3,
          }}
        />
      </div>
    </div>
  );
};

export default GroupButtons;
