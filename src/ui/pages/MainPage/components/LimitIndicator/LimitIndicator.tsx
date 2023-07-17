import { FC } from 'react';

import { Limit } from '@/types/limit';

import styles from './LimitIndicator.module.scss';

interface LimitIndicatorProps extends Omit<Limit, 'id'> {
  isSkeleton?: boolean;
}

const LimitIndicator: FC<LimitIndicatorProps> = ({
  title,
  totalValue = 100,
  currentValue = 100,
  measurement,
  unlimited,
  isSkeleton,
}) => {
  const percent = unlimited ? 100 : (currentValue * 100) / totalValue;

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {!isSkeleton && <p className={styles.title}>{title}</p>}
        {isSkeleton && <div className={cn(styles.skeleton, styles.titleSkeleton)} />}
        <div className={styles.progress}>
          {!isSkeleton && (
            <div
              className={cn(styles.progressValue, {
                [styles.high]: percent > 50,
                [styles.medium]: percent > 25 && percent <= 50,
                [styles.low]: percent <= 25,
              })}
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          )}
        </div>
      </div>
      <div className={styles.right}>
        {isSkeleton && <div className={cn(styles.skeleton, styles.valueSkeleton)} />}
        {!isSkeleton && (
          <>
            {unlimited && (
              <p>
                <b>Безлимитно</b>
              </p>
            )}
            {!unlimited && (
              <>
                <p className={styles.remains}>Осталось:</p>
                <p className={styles.values}>
                  <b>{currentValue}</b>
                  из
                  <span>{totalValue}</span>
                  <span>{measurement}</span>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LimitIndicator;
