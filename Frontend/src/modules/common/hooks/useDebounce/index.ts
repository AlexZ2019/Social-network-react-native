import { useState, useEffect } from 'react';

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  
  return { debouncedValue, debounceLoading: loading };
}
