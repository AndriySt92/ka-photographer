import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { sessionOptions } from '@/config';
import { cn, fadeInWithOpacity } from '@/lib';
import type { SessionOption, SessionOrderData } from '@/types';

import { Button, FormField, GroupButtons } from './';

// Constants for validation
const NAME_MIN = 2;
const NAME_MAX = 70;
const SOCIAL_MIN = 10;
const SOCIAL_MAX = 70;
const DATE_MAX = 70;
const COMMENT_MAX = 200;

interface SessionOrderFormProps {
  sessionType?: SessionOption['value'];
  className?: string;
}

const SessionOrderForm = ({ sessionType, className }: SessionOrderFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<SessionOrderData>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      sessionType: sessionType || '',
      social: '',
      comment: '',
      sessionDate: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form
      className={cn(
        'pointer-events-auto flex h-full max-h-[500px] flex-col gap-5 overflow-visible',
        className,
      )}
      onSubmit={onSubmit}
    >
      <FormField
        label="Ім'я"
        name="name"
        register={register}
        control={control}
        error={errors.name?.message}
        validation={{
          required: "Обов'язкове поле",
          minLength: {
            value: NAME_MIN,
            message: `Ім'я має містити щонайменше ${NAME_MIN} символів`,
          },
          maxLength: {
            value: NAME_MAX,
            message: `Ім'я має містити щонайбільше ${NAME_MAX} символів`,
          },
        }}
      />

      <FormField
        label="Telegram / Instagram"
        name="social"
        register={register}
        control={control}
        error={errors.social?.message}
        validation={{
          required: "Обов'язкове поле",
          minLength: {
            value: SOCIAL_MIN,
            message: `Telegram / Instagram має містити щонайменше ${SOCIAL_MIN} символів`,
          },
          maxLength: {
            value: SOCIAL_MAX,
            message: `Telegram / Instagram має містити щонайбільше ${SOCIAL_MAX} символів`,
          },
        }}
      />

      <motion.div variants={fadeInWithOpacity}>
        <Controller
          name="sessionType"
          control={control}
          rules={{ required: 'Оберіть тип зйомки' }}
          render={({ field }) => (
            <GroupButtons
              options={sessionOptions}
              selectedOption={field.value}
              onChange={field.onChange}
              label="обери тип зйомки:"
              error={errors.sessionType?.message}
            />
          )}
        />
      </motion.div>

      <FormField
        register={register}
        control={control}
        label="Дата або період зйомки"
        name="sessionDate"
        error={errors.sessionDate?.message}
        validation={{
          maxLength: {
            value: DATE_MAX,
            message: `Поле має містити щонайбільше ${DATE_MAX} символів`,
          },
        }}
      />

      <FormField
        register={register}
        control={control}
        as="textarea"
        label="Коментар або ідеї"
        name="comment"
        underlineClassName="bottom-[5px]"
        error={errors.comment?.message}
        validation={{
          maxLength: {
            value: COMMENT_MAX,
            message: `Коментар або ідеї має містити щонаймфйбільше ${COMMENT_MAX} символів`,
          },
        }}
      />

      {/* Display the first error message at the bottom of the form */}
      {Object.values(errors)[0]?.message && (
        <p className="absolute bottom-[67px] text-sm text-red-500">
          {Object.values(errors)[0]?.message as string}
        </p>
      )}

      {/* Button */}
      <motion.div layout className="w-fit self-center sm:self-end" variants={fadeInWithOpacity}>
        <Button type="submit" size="textSm">
          Замовити
        </Button>
      </motion.div>
    </form>
  );
};

export default SessionOrderForm;
