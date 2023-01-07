import { useEffect, useState } from 'react';

export function getStorageValue<T>(key: string, defaultValue: T) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
  return defaultValue;
}

export function setStorageValue<T>(key: string, value: T) {
  if (typeof window !== 'undefined')
    localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => getStorageValue<T>(key, defaultValue));
  useEffect(() => setStorageValue<T>(key, value), [key, value]);
  return [value, setValue] as const;
}
