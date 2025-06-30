import { useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  label: string;
}

const Input = ({ label }: InputProps) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full pt-5">
      <motion.label
        className={`pointer-events-none absolute left-0 top-5 z-50 uppercase text-white !opacity-70 ${
          isFocused || value ? 'xl:text-base 2xl:text-lg' : 'text-base'
        }`}
        initial={false}
        animate={{
          y: isFocused || value ? -15 : 10,
          opacity: isFocused || value ? 0.8 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        {label}
      </motion.label>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => !value && setIsFocused(false)}
        className="relative z-[60] w-full border-b border-white bg-transparent py-3 text-white !opacity-70 outline-none"
      />

      {/* Animated under line */}
      <motion.div
        className="absolute bottom-0 left-0 z-[60] h-0.5 w-full origin-left bg-white"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default Input;
