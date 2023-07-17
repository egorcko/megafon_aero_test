import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ArrowIcon from 'public/icons/arrow_back.svg';

import styles from './Errors.module.scss';

const Error: FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.reload();
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          <ArrowIcon />
        </Link>
      </header>
      <div className={styles.content}>
        <img src="/gifs/notFound.gif" alt="not found" className={styles.image} />
        <h1 className={styles.title}>Что-то пошло не так</h1>
        <p className={styles.text}>Нажмите кнопку или зайдите позже</p>
        <button className={styles.button} type="button" onClick={handleClick}>
          Обновить
        </button>
      </div>
    </div>
  );
};

export default Error;
