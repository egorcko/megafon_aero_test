import { FC } from 'react';

import styles from './Balance.module.scss';

interface BalanceProps {
  value: number;
}

const Balance: FC<BalanceProps> = ({ value }) => {
  const [main, second] = String(value).split('.');

  return (
    <div className={styles.root}>
      <p className={styles.title}>Доступно сегодня</p>
      <p className={styles.value}>
        <span className={styles.mainDigit}>{main}</span>
        {!!second && <span>,{second}</span>}
        <span>&nbsp;₽</span>
      </p>
      <button type="button" className={styles.button}>
        Пополнить
      </button>
    </div>
  );
};

export default Balance;
