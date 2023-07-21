'use client';

import { ChangeEventHandler, FC, FormEventHandler, useCallback, useState } from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/navigation';

import { authUser } from '@/api/auth';
import { AUTH_COOKIE } from '@/constants';
import { COOKIES } from '@/utils/cookies';

import styles from './LoginForm.module.scss';

const PHONE_LENGTH = 11;

const LoginForm: FC = () => {
  const router = useRouter();

  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const cleanValue = value.replace(/\D/g, '');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const { status, data } = await authUser(cleanValue);

    setLoading(false);

    if (status && data?.success) {
      COOKIES.set(AUTH_COOKIE, 1);
      router.push('/');
    } else {
      setError(data?.errorText ?? '');
    }
  };

  return (
    <section className={styles.root}>
      <h1 className={styles.title}>Вход в Личный кабинет</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label
          className={cn(styles.inputWrapper, {
            [styles.filled]: cleanValue.length > 0,
            [styles.correct]: cleanValue.length === PHONE_LENGTH,
            [styles.error]: !!error,
          })}
          htmlFor="phone"
        >
          <span className={styles.inputLabel}>
            Номер телефона<sup>*</sup>
          </span>
          <InputMask
            className={styles.input}
            id="phone"
            disabled={loading}
            mask="+7 (999) 999-99-99"
            value={value}
            onChange={handleChange}
          />
          {!!error && <p className={styles.errorText}>{error}</p>}
        </label>

        <button
          type="submit"
          className={cn(styles.button, { [styles.loading]: loading })}
          disabled={cleanValue.length < PHONE_LENGTH}
        >
          <span className={styles.buttonText}>Войти</span>
          <span className={styles.buttonLoader}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
