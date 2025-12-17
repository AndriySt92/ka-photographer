import { useForm } from 'react-hook-form';

import { Button, ErrorMessage, FormField, Typography } from '@/components';
import useLogin from '@/hooks/useLogin';
import type { LoginCredentials } from '@/types';
import { getErrorMessage } from '@/utils';

const PASSWORD_MIN = 6;
const EMAIL_PATTERN = {
  value:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  message: 'Будь ласка, введіть коректну email адресу',
};

const SignIn = () => {
  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    handleSubmit,
    control,
  } = useForm<LoginCredentials>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isPending, error } = useLogin();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  const hasError = !isDirty || !isValid;

  return (
    <div className="h-screen">
      <div className="container flex h-full items-center justify-center space-y-12 py-16 2xl:space-y-16 2xl:py-24">
        <form
          className="flex w-full max-w-xl flex-col space-y-6 rounded-3xl border border-secondary/40 bg-gradient-to-r from-accent/40 to-primary p-8 backdrop-blur-lg"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <Typography parentAs="h1" size="3xl" align="center">
            Авторизація
          </Typography>

          <FormField
            label="Ім'я"
            name="email"
            type="email"
            register={register}
            control={control}
            error={errors.email?.message}
            validation={{
              required: "Обов'язкове поле",
              pattern: EMAIL_PATTERN,
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

          {error && <ErrorMessage error={getErrorMessage(error)} />}

          {/* Button */}
          <div className="self-end">
            <Button
              type="submit"
              size="textSm"
              disabled={hasError || isSubmitting}
              loadingText="Вхід"
              isLoading={isPending}
            >
              Увійти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
