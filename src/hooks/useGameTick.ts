import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const useGameTick = () => {
  const tick = useGameStore(state => state.tick);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000); // 每秒执行一次

    return () => {
      clearInterval(interval);
    };
  }, [tick]);
};