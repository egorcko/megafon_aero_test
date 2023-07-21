import { FC } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LogoIcon from 'public/icons/logo.svg';

import { AUTH_COOKIE } from '@/constants';

import Content from './_components/Content/Content';

import styles from './page.module.scss';
export const metadata = {
  title: 'Главная страница',
};

const MainPage: FC = () => {
  const cookieStore = cookies();

  if (!cookieStore.has(AUTH_COOKIE)) {
    redirect('/login');
  }

  return (
    <section className={styles.root}>
      <LogoIcon className={styles.logo} />
      <Content />
    </section>
  );
};

export default MainPage;
