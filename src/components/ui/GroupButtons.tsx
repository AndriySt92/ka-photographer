import { LayoutGroup, motion } from 'framer-motion';

import { cn } from '../../lib';
import { Button, Typography } from '..';

interface ButtonOption {
  label: string;
  value: string;
}

interface GroupButtonsProps {
  options: ButtonOption[];
  selectedOption: string | null;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
}
const ActiveLine = () => {
  return (
    <motion.div
      className="absolute bottom-[-1px] h-0.5 w-full bg-secondary"
      layoutId="activeItem"
    />
  );
};

const GroupButtons = ({ options, selectedOption, onChange, label, error }: GroupButtonsProps) => {
  return (
    <div className="pointer-events-auto relative ">
      {label && (
        <Typography size="custom" className="pb-2 text-base sm:text-lg">
          {label}
        </Typography>
      )}

      <div className="scrollbar-hide relative flex justify-between overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-secondary/60">
        <LayoutGroup>
          {options.map((option) => (
            <div className="relative flex-shrink-0" key={option.value}>
              <Button
                intent="minimal"
                type="button"
                onClick={() => onChange(option.value)}
                className={cn(
                  'relative rounded-sm xl:px-4 xl:py-3',
                  selectedOption === option.value
                    ? 'text-secondary opacity-100'
                    : ' text-white opacity-70 hover:bg-accent/40 hover:opacity-100',
                )}
              >
                {option.label}
              </Button>
              {selectedOption === option.value && <ActiveLine />}
            </div>
          ))}
        </LayoutGroup>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default GroupButtons;
