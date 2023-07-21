'use client';

import type { FC } from 'react';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import notFoundAnimation from 'public/animations/notFound.json';
import ArrowIcon from 'public/icons/arrow_back.svg';

import styles from './error.module.scss';

interface ErrorProps {
  reset: () => void;
}

const Error: FC<ErrorProps> = () => {
  const router = useRouter();

  const handleClick = () => {
    router.refresh();
  };

  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          <ArrowIcon />
        </Link>
      </header>
      <div className={styles.content}>
        <Lottie animationData={notFoundAnimation} className={styles.animation} />
        <h1 className={styles.title}>Что-то пошло не так</h1>
        <p className={styles.text}>Нажмите кнопку или зайдите позже</p>
        <button className={styles.button} type="button" onClick={handleClick}>
          Обновить
        </button>
      </div>
    </main>
  );
};

export default Error;
