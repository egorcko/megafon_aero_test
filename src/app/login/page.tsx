import { FC } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LogoIcon from 'public/icons/logo.svg';

import { AUTH_COOKIE } from '@/constants';

import LoginForm from './_components/LoginForm/LoginForm';

import styles from './page.module.scss';

export const metadata = {
  title: 'Авторизация',
};

const Login: FC = () => {
  const cookieStore = cookies();

  if (cookieStore.has(AUTH_COOKIE)) {
    redirect('/');
  }

  return (
    <div className={styles.root}>
      <LogoIcon className={styles.logo} />
      <LoginForm />
      <h2 className={styles.subtitle}>Включайся!</h2>
    </div>
  );
};

export default Login;
