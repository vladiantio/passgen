import type { ColorScheme } from "@/types/ColorScheme";

export function loadColorScheme(): ColorScheme {
  if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    return 'dark';
  } else {
    document.documentElement.classList.remove('dark')
    return 'light';
  }
}