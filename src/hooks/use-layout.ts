import { useLocalization } from '@/hooks/use-localization';

export function useLayoutDirection() {
  const { direction } = useLocalization();

  return {
    direction,
    rowDirection: direction === 'rtl' ? ('row-reverse' as const) : ('row' as const),
    textAlign: direction === 'rtl' ? ('right' as const) : ('left' as const),
  };
}
