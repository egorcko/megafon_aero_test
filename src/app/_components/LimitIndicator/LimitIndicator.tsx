import { FC } from 'react';

import { Limit } from '@/types/limit';

import useProgressValue from './LimitIndicator.hooks';

import styles from './LimitIndicator.module.scss';

interface LimitIndicatorProps extends Omit<Limit, 'id'> {
  isSkeleton?: boolean;
}

const LimitIndicator: FC<LimitIndicatorProps> = ({
  title,
  totalValue,
  currentValue,
  measurement,
  unlimited,
  isSkeleton,
}) => {
  const { computedClassName, percent } = useProgressValue({
    styles,
    totalValue,
    currentValue,
    unlimited,
  });

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {!isSkeleton && <p className={styles.title}>{title}</p>}
        {isSkeleton && <div className={cn(styles.skeleton, styles.titleSkeleton)} />}
        <div className={styles.progress}>
          {!isSkeleton && (
            <div
              className={cn(styles.progressValue, computedClassName)}
              style={{
                width: `${percent}%`,
              }}
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
