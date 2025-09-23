import { useRef, useState } from 'react';
import type { Control, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { motion, type Variants } from 'framer-motion';

import { cn, fadeInWithOpacity } from '@/lib';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  as?: 'input' | 'textarea';
  error?: string;
  register: UseFormRegister<T>;
  control: Control<T>;
  validation?: RegisterOptions<T, Path<T>>;
  variants?: Variants;
  formFieldClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  underlineClassName?: string;
  maxLength?: number; //Textarea prop
  rows?: number; //Textarea prop
}

const AnimatedUnderline = ({
  isFocused,
  isError,
  className,
}: {
  isFocused: boolean;
  isError?: boolean;
  className?: string;
}) => (
  <motion.div
    className={cn(
      'absolute bottom-0 left-0 h-0.5 w-full origin-left',
      isError ? 'bg-red-500' : 'bg-white',
      className,
    )}
    initial={false}
    animate={{
      scaleX: isFocused ? 1 : 0,
    }}
    transition={{ duration: 0.3 }}
  />
);

const FormField = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  as = 'input',
  error,
  register,
  control,
  validation,
  maxLength = 200,
  rows = 1,
  variants = fadeInWithOpacity,
  formFieldClassName,
  labelClassName,
  wrapperClassName,
  underlineClassName,
  ...rest
}: FormFieldProps<T>) => {
  const value = useWatch({ name, control });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust the textarea height to fit its content
  const handleTextareaInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const baseFieldClasses =
    'w-full border-b bg-transparent py-2 text-secondary !opacity-60 outline-none sm:py-3';

  const hasFocusOrValue = isFocused || !!value;
  return (
    <motion.div className={cn('relative w-full', wrapperClassName)} variants={variants}>
      <motion.label
        className={cn(
          'pointer-events-none absolute left-0 uppercase text-white opacity-70',
          hasFocusOrValue ? 'text-sm xl:text-base' : 'text-sm xl:text-base',
          labelClassName,
        )}
        initial={false}
        animate={{
          y: hasFocusOrValue ? -20 : 10,
          opacity: hasFocusOrValue ? 0.8 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          type: 'spring',
        }}
      >
        {label}
      </motion.label>

      <div className="relative">
        {as === 'input' ? (
          <input
            id={name}
            type={type}
            {...register(name, validation)}
            {...rest}
            onFocus={() => setIsFocused(true)}
            onBlur={() => !value && setIsFocused(false)}
            className={cn(
              baseFieldClasses,
              error ? 'border-red-500' : 'border-secondary',
              formFieldClassName,
            )}
          />
        ) : (
          <textarea
            id={name}
            onInput={handleTextareaInput}
            maxLength={maxLength}
            rows={rows}
            style={{ overflow: 'hidden', resize: 'none' }}
            {...register(name, validation)}
            ref={(el) => {
              register(name).ref(el);
              textareaRef.current = el;
            }}
            {...rest}
            onFocus={() => setIsFocused(true)}
            onBlur={() => !value && setIsFocused(false)}
            className={cn(
              baseFieldClasses,
              'max-h-26 resize-none overflow-hidden',
              error ? 'border-red-500' : 'border-secondary',
              formFieldClassName,
            )}
          />
        )}

        {/* Animated underline */}
        <AnimatedUnderline isFocused={isFocused} isError={!!error} className={underlineClassName} />
      </div>
    </motion.div>
  );
};

export default FormField;
