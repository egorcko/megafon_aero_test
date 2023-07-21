import { Limit } from '@/types/limit';

interface UseProgressValueParams extends Pick<Limit, 'currentValue' | 'unlimited' | 'totalValue'> {
  styles: Dictionary<string>;
}

const MIN_VALUE = 25;
const MED_VALUE = 50;

export default function useProgressValue({
  unlimited,
  styles,
  totalValue = 100,
  currentValue = 100,
}: UseProgressValueParams) {
  const percent = unlimited ? 100 : (currentValue * 100) / totalValue;

  return {
    computedClassName: {
      [styles.high]: percent > MED_VALUE,
      [styles.medium]: percent > MIN_VALUE && percent <= MED_VALUE,
      [styles.low]: percent <= MIN_VALUE,
    },
    percent: Math.min(percent, 100),
  };
}
