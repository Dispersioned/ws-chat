import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue?: any) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
    // eslint-disable-next-line
  }, [value]);

  return [value, setValue];
};
