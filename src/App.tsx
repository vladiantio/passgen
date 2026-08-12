import { zxcvbnAsync } from '@zxcvbn-ts/core';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styles from './App.module.css';
import Checkbox from './components/Checkbox';
import Frame from './components/Frame';
import PasswordButton from './components/PasswordButton';
import PasswordLengthField from './components/PasswordLengthField';
import PasswordScore from './components/PasswordScore';
import RadioButton from './components/RadioButton';
import ThemeSelector from './components/ThemeSelector';
import Tooltip from './components/Tooltip';
import {
  ArrowPathIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  EyeSlashIcon,
  GitHubIcon,
  QuestionMarkCircleIcon,
} from './icons';
import {
  PasswordSettings,
  defaultSettings,
  generatePassword,
} from './utils/PasswordGenerator';
import {
  getStorageValue,
  setStorageValue,
  useLocalStorage,
} from './utils/localStorage';
import useDebouncedEffect from './utils/useDebouncedEffect';

function App() {
  const initialSettings: PasswordSettings = getStorageValue(
    'passwordSettings',
    defaultSettings,
  );

  const [password, setPassword] = useState(generatePassword(initialSettings));
  const [passwordScore, setPasswordScore] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useLocalStorage(
    'passwordHidden',
    true,
  );

  const { control, register, watch } = useForm<PasswordSettings>({
    defaultValues: initialSettings,
  });

  const settings = watch();

  const doSetPassword = (settings: PasswordSettings) => {
    setStorageValue('passwordSettings', settings);
    setPassword(generatePassword(settings));
    if (isCopied) setIsCopied(false);
  };

  useEffect(() => {
    const subscription = watch(doSetPassword);
    return () => subscription.unsubscribe();
  }, [watch]);

  const copyPassword = () => {
    const result = copy(password);
    setIsCopied(result);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
    if (isCopied) setIsCopied(false);
  };

  const calcPasswordScoreAsync = async () => {
    const { score } = await zxcvbnAsync(password);
    setPasswordScore(score);
  };

  const togglePasswordHidden = () => setIsPasswordHidden(!isPasswordHidden);

  useEffect(() => {
    calcPasswordScoreAsync();
  }, []);

  useDebouncedEffect(
    () => {
      calcPasswordScoreAsync();
    },
    200,
    [password],
  );

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <img className={styles.logo} src="icon.svg" />
          <h1>PassGen</h1>
        </div>
        <div className={styles.navLinks}>
          <ThemeSelector />
          <a
            className={styles.link}
            href="https://github.com/vladiantio/passgen"
            rel="noopener noreferrer"
            target="_blank"
            title="GitHub"
          >
            <GitHubIcon className={styles.icon} />
          </a>
        </div>
      </nav>
      <main className={styles.main}>
        <Frame className={styles.passwordFrame}>
          <div className={styles.row}>
            <input
              type={isPasswordHidden ? 'password' : 'text'}
              className={styles.passwordInput}
              name="password"
              placeholder="Escribe una contraseña..."
              autoComplete="new-password"
              value={password}
              onChange={({ target: { value } }) => onChangePassword(value)}
            />
            <Tooltip content="Copiar">
              <PasswordButton
                className={styles.iconButton}
                disabled={password.length == 0}
                color={isCopied ? 'success' : 'primary'}
                onClick={copyPassword}
                aria-label="Copiar"
              >
                {isCopied ? (
                  <ClipboardDocumentCheckIcon className={styles.icon} />
                ) : (
                  <ClipboardDocumentIcon className={styles.icon} />
                )}
              </PasswordButton>
            </Tooltip>
            <Tooltip content={isPasswordHidden ? 'Mostrar' : 'Ocultar'}>
              <PasswordButton
                className={styles.iconButton}
                onClick={togglePasswordHidden}
                aria-label={isPasswordHidden ? 'Mostrar' : 'Ocultar'}
              >
                {isPasswordHidden ? (
                  <EyeSlashIcon className={styles.icon} />
                ) : (
                  <EyeIcon className={styles.icon} />
                )}
              </PasswordButton>
            </Tooltip>
            <Tooltip content="Regenerar">
              <PasswordButton
                className={styles.iconButton}
                onClick={() => doSetPassword(settings)}
                aria-label="Regenerar"
              >
                <ArrowPathIcon className={styles.icon} />
              </PasswordButton>
            </Tooltip>
          </div>
          <div>
            <PasswordScore score={passwordScore} />
          </div>
        </Frame>
        <Frame className={styles.settingsFrame}>
          <div className={styles.grid}>
            <div className={styles.lengthColumn}>
              <Controller
                control={control}
                name="passwordLength"
                render={({ field }) => <PasswordLengthField field={field} />}
              />
            </div>
            <div className={styles.radioGroup}>
              <RadioButton id="m1" value="memo" {...register('mode')}>
                Fácil de recordar
                <Tooltip
                  content="Genera una palabra y números al azar para una contraseña fácil de leer y recordar."
                  placement="bottom"
                >
                  <span className={styles.hint}>
                    <QuestionMarkCircleIcon className={styles.icon} />
                  </span>
                </Tooltip>
              </RadioButton>
              <RadioButton id="m2" value="allChars" {...register('mode')}>
                Todos los caracteres
                <Tooltip
                  content="Genera cualquier combinación de caracteres para una contraseña más segura."
                  placement="bottom"
                >
                  <span className={styles.hint}>
                    <QuestionMarkCircleIcon className={styles.icon} />
                  </span>
                </Tooltip>
              </RadioButton>
            </div>
            <div
              className={`${styles.checkboxGroup}${
                settings.mode == 'memo' ? ` ${styles.invisible}` : ''
              }`}
            >
              <Checkbox id="withUppercase" {...register('withUppercase')}>
                Mayúsculas
              </Checkbox>
              <Checkbox id="withLowercase" {...register('withLowercase')}>
                Minúsculas
              </Checkbox>
              <Checkbox id="withNumbers" {...register('withNumbers')}>
                Números
              </Checkbox>
              <Checkbox id="withSymbols" {...register('withSymbols')}>
                Símbolos
              </Checkbox>
            </div>
          </div>
        </Frame>
      </main>
    </div>
  );
}

export default App;
