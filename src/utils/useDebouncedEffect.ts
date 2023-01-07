import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export default function useDebouncedEffect(
  callback: EffectCallback,
  delay: number,
  deps: DependencyList = [],
) {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
}
