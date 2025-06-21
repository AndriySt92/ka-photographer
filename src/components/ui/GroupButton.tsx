import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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
    <div className="relative z-50">
      {label && <h6 className="pb-2 font-title uppercase text-secondary 2xl:text-lg">{label}</h6>}

      <div className="relative flex justify-between border-b border-secondary/80">
        {options.map((option) => (
          <button
            key={option.value}
            ref={(el) => {
              buttonRefs.current[option.value] = el;
            }}
            onClick={() => onChange(option.value)}
            className={`
              relative border-none bg-none uppercase outline-none transition-colors duration-300
              xl:px-4 xl:py-3 2xl:text-lg
              ${
                value === option.value
                  ? 'text-secondary opacity-100'
                  : 'rounded-t-sm text-white opacity-70 hover:bg-accent/40 hover:opacity-100'
              }
            `}
          >
            {option.label}
          </button>
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
