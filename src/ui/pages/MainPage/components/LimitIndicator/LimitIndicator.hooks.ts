import { Limit } from '@/types/limit';

interface UseProgressValueParams extends Pick<Limit, 'currentValue' | 'unlimited' | 'totalValue'> {
  styles: Dictionary<string>;
}

export default function useProgressValue({
  unlimited,
  styles,
  totalValue = 100,
  currentValue = 100,
}: UseProgressValueParams) {
  const percent = unlimited ? 100 : (currentValue * 100) / totalValue;

  return {
    computedClassName: {
      [styles.high]: percent > 50,
      [styles.medium]: percent > 25 && percent <= 50,
      [styles.low]: percent <= 25,
    },
    percent: Math.min(percent, 100),
  };
}
