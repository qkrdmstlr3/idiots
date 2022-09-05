import throttle from 'lodash/throttle';
import { useEffect, useMemo, useState } from 'react';

const THROTTLE_WAIT_MS = 100;

interface UseScrollPositionParams {
  standard: number;
}

const useScrollPosition = ({ standard }: UseScrollPositionParams) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const isScrollTop = scrollPosition < standard;

  const updatePosition = throttle(() => {
    setScrollPosition(window.pageYOffset);
  }, THROTTLE_WAIT_MS);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener('scroll', updatePosition, { signal });
    return () => controller.abort();
  }, []);

  return {
    isScrollTop,
    scrollPosition,
  };
};

export default useScrollPosition;
