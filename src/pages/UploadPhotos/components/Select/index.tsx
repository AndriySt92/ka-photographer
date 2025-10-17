import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { dropdownArrow } from '@/assets/icons';
import { Button, Icon } from '@/components';
import { useClickOutside } from '@/hooks';
import { cn } from '@/lib';

interface SelectOption {
  label: string;
  value: string;
}

interface StyledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  className?: string;
}

const Select = ({ options, className, value, onChange, ...props }: StyledSelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useClickOutside(containerRef);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Custom select button */}
      <Button
        type="button"
        className={cn('relative flex min-w-52 justify-between', className)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selectedOption.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2 flex-shrink-0"
        >
          <Icon name="dropdown-arrow" icon={dropdownArrow} size="h-5 w-5" />
        </motion.div>
      </Button>

      {/* Dropdown options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="section-border absolute z-50 mt-2 w-full max-w-52 origin-top space-y-1 rounded-xl bg-primary p-2"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left font-primary text-sm uppercase text-secondary transition-all duration-200 hover:bg-accent/40 lg:text-base',
                  value === option.value && 'bg-accent/40',
                )}
                onClick={() => {
                  if (onChange) {
                    onChange({
                      target: { value: option.value },
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden native select for form submission */}
      <select
        className="pointer-events-none absolute opacity-0"
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
