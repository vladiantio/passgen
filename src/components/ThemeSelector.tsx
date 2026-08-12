import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

import type { ColorScheme } from '@/types/ColorScheme';
import { loadColorScheme } from '@/utils/theme';

import styles from './ThemeSelector.module.css';

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
    const lsColorScheme = (localStorage.getItem('theme') ??
      'system') as ColorScheme;
    setCurrentColorScheme(loadColorScheme());
    setColorScheme(lsColorScheme);
  }, []);

  return (
    <details ref={ref} className="dropdown">
      <summary
        tabIndex={0}
        role="button"
        title="Tema"
        className={styles.summary}
      >
        {currentColorScheme == 'light' ? (
          <SunIcon className={styles.icon} stroke-width="3" />
        ) : currentColorScheme == 'dark' ? (
          <MoonIcon className={styles.icon} stroke-width="3" />
        ) : (
          <div className={styles.icon}></div>
        )}
      </summary>
      <div tabIndex={0} className={styles.menu}>
        <ul className={styles.options}>
          <li>
            <button
              type="button"
              onClick={() => changeColorScheme('light')}
              className={`${styles.option}${
                colorScheme == 'light' ? ` ${styles.selected}` : ''
              }`}
            >
              <SunIcon className={styles.icon} stroke-width="2" />
              <span>Claro</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => changeColorScheme('dark')}
              className={`${styles.option}${
                colorScheme == 'dark' ? ` ${styles.selected}` : ''
              }`}
            >
              <MoonIcon className={styles.icon} stroke-width="2" />
              <span>Oscuro</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => changeColorScheme('system')}
              className={`${styles.option}${
                colorScheme == 'system' ? ` ${styles.selected}` : ''
              }`}
            >
              <ComputerDesktopIcon className={styles.icon} stroke-width="2" />
              <span>Sistema</span>
            </button>
          </li>
        </ul>
      </div>
    </details>
  );
}

export default ThemeSelector;
