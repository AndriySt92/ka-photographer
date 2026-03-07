import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { sessionOptions } from '@/config';
import { useCreateBooking } from '@/hooks';
import { cn, fadeInWithOpacity } from '@/lib';
import type { BookingFormData, CategoriesItem } from '@/types';

import { Button } from '../Button';
import FormField from '../FormField';
import GroupButtons from '../GroupButtons';

// Constants for validation
const NAME_MIN = 2;
const NAME_MAX = 70;
const CONTACT_MIN = 3;
const CONTACT_MAX = 100;
const DATE_MAX = 70;
const COMMENT_MAX = 200;

const UA_PHONE_REGEX = /^(?:\+?380|0)\d{9}$/;
const INSTAGRAM_REGEX = /^@?[A-Za-z0-9_](?:[A-Za-z0-9_.]{0,28}[A-Za-z0-9_])?$/;
const NAME_REGEX = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\s'-]+$/;

interface SessionOrderFormProps {
  sessionType?: CategoriesItem['value'];
  className?: string;
  onSubmitSuccess?: () => void;
}

const SessionOrderForm = ({ sessionType, className, onSubmitSuccess }: SessionOrderFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<BookingFormData>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      sessionType: sessionType || '',
      contact: '',
      comment: '',
      sessionDate: '',
    },
  });
  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createBooking(data);

      if (onSubmitSuccess) onSubmitSuccess();
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form
      className={cn('pointer-events-auto flex h-full max-h-[500px] flex-col gap-5', className)}
      onSubmit={onSubmit}
      data-testid="session-order-form"
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
          pattern: {
            value: NAME_REGEX,
            message: "Ім'я може містити лише літери, пробіли, апострофи та дефіси",
          },
        }}
      />

      <FormField
        label="Instagram / Телефон"
        name="contact"
        register={register}
        control={control}
        error={errors.contact?.message}
        validation={{
          required: "Обов'язкове поле",
          validate: (value: string | null | undefined) => {
            const v = String(value ?? '').trim();
            if (v.length < CONTACT_MIN) {
              return `Контакт має містити щонайменше ${CONTACT_MIN} символів`;
            }
            if (v.length > CONTACT_MAX) {
              return `Контакт не може перевищувати ${CONTACT_MAX} символів`;
            }
            if (!(UA_PHONE_REGEX.test(v) || INSTAGRAM_REGEX.test(v))) {
              return 'Будь ласка, введіть коректний номер телефону (+380XXXXXXXXX) або Instagram (@username)';
            }
            return true;
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

      {/* Button */}
      <motion.div layout className="w-fit self-center sm:self-end" variants={fadeInWithOpacity}>
        <Button type="submit" size="textSm" isLoading={isPending} loadingText="Відправлення">
          Замовити
        </Button>
      </motion.div>
    </form>
  );
};

export default SessionOrderForm;
