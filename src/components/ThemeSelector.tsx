import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import type { ColorScheme } from '@/types/ColorScheme';
import { loadColorScheme } from '@/utils/theme';

function ThemeSelector() {
  const ref = useRef<HTMLDetailsElement>(null);
  const [colorScheme, setColorScheme] = useState<ColorScheme>();
  const [currentColorScheme, setCurrentColorScheme] = useState<ColorScheme>();

  const closeDropdown = () => {
    ref.current?.removeAttribute('open');
  };

  const changeColorScheme = (scheme: ColorScheme) => {
    localStorage.setItem('theme', scheme);
    setCurrentColorScheme(loadColorScheme());
    setColorScheme(scheme);
    closeDropdown();
  };

  useEffect(() => {
    const lsColorScheme = (localStorage.getItem('theme') ?? 'system') as ColorScheme;
    setCurrentColorScheme(loadColorScheme());
    setColorScheme(lsColorScheme);
  }, []);

  return (
    <details ref={ref} className="dropdown dropdown-end">
      <summary tabIndex={0} role="button" title="Tema" className="inline-block align-middle select-none transition text-body text-opacity-60 hover:text-opacity-100">{
        currentColorScheme == 'light' ?
          <SunIcon className="size-6" stroke-width="3" /> :
        currentColorScheme == 'dark' ?
          <MoonIcon className="size-6" stroke-width="3" /> :
        <div className="size-6"></div>
      }</summary>
      <div tabIndex={0} className="dropdown-content backdrop-blur bg-soft bg-opacity-75 rounded-xl z-10 w-68 p-1 shadow -me-2 mt-6">
        <ul className="flex gap-1 text-sm">
          <li><button type="button" onClick={() => changeColorScheme('light')} className={`flex flex-col items-center justify-center w-full rounded-lg px-4 py-2 transition-colors hover:bg-primary hover:bg-opacity-10 ${colorScheme == 'light' ? 'text-primary' : ''}`}><SunIcon className="size-6" stroke-width="2" /><span>Claro</span></button></li>
          <li><button type="button" onClick={() => changeColorScheme('dark')} className={`flex flex-col items-center justify-center w-full rounded-lg px-4 py-2 transition-colors hover:bg-primary hover:bg-opacity-10 ${colorScheme == 'dark' ? 'text-primary' : ''}`}><MoonIcon className="size-6" stroke-width="2" /><span>Oscuro</span></button></li>
          <li><button type="button" onClick={() => changeColorScheme('system')} className={`flex flex-col items-center justify-center w-full rounded-lg px-4 py-2 transition-colors hover:bg-primary hover:bg-opacity-10 ${colorScheme == 'system' ? 'text-primary' : ''}`}><ComputerDesktopIcon className="size-6" stroke-width="2" /><span>Sistema</span></button></li>
        </ul>
      </div>
    </details>
  );
}

export default ThemeSelector;