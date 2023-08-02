import { useCallback, useEffect } from 'react';

type CallbackFunction = (...args: any[]) => any;

export function useBeforeUnload(callback: CallbackFunction) {
  const handleBeforeunload = useCallback(
    (e: BeforeUnloadEvent) => {
      callback();
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    return () => window.removeEventListener('beforeunload', handleBeforeunload);
  }, [handleBeforeunload]);
}
