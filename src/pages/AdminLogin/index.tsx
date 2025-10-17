import { useForm } from 'react-hook-form';

import { Button, FormField, Typography } from '@/components';
import type { AdminLoginFormData } from '@/types';

const PASSWORD_MIN = 6;
const NAME_MIN = 2;
const NAME_MAX = 70;

const SignIn = () => {
  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    handleSubmit,
    control,
  } = useForm<AdminLoginFormData>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const hasError = !isDirty || !isValid;

  return (
    <div className="h-screen">
      <div className="space-y-lg padding-y container flex h-full items-center justify-center">
        <form
          className="section-border flex w-full max-w-xl flex-col space-y-6 rounded-3xl bg-gradient-to-r from-accent/40 p-8 backdrop-blur-lg"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <Typography parentAs="h1" size="3xl" align="center">
            Авторизація
          </Typography>

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
            label="Пароль"
            name="password"
            type="password"
            register={register}
            control={control}
            error={errors.password?.message}
            validation={{
              required: "Обов'язкове поле",
              minLength: {
                value: PASSWORD_MIN,
                message: `Пароль має містити щонайменше ${PASSWORD_MIN} символів`,
              },
            }}
          />

          {/* Button */}
          <div className="self-end">
            <Button type="submit" size="textSm" disabled={hasError || isSubmitting}>
              {isSubmitting ? 'Вхід...' : 'Увійти'}
            </Button>
          </div>

          {/* Display the first error message */}
          {hasError && (
            <p className="text-sm text-red-500">{Object.values(errors)[0]?.message as string}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
