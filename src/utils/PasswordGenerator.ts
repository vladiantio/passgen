import { getRandomInt } from './numbers';

const vocals = 'aeiou';
const letters = 'bcdfghjklmnpqrstvwxyz';
const numbers = '1234567890';
const symbols = '~!#%^&*_?';

export type PasswordSettings = {
  passwordLength?: number;
  mode?: string;
  withLowercase?: boolean;
  withUppercase?: boolean;
  withNumbers?: boolean;
  withSymbols?: boolean;
};

function generateMemorablePassword(settings: PasswordSettings) {
  const passwordLength = settings.passwordLength ?? 16;
  const syllables = getRandomInt(2, (passwordLength - 4) / 2);
  const wordLength = syllables * 2;
  const numbersLength = passwordLength - wordLength;

  let memPassword = '';
  for (let i = 0; i < wordLength; i++) {
    if (i % 2 == 0) {
      memPassword += letters.charAt(getRandomInt(0, 20));
    } else {
      memPassword += vocals.charAt(getRandomInt(0, 4));
    }
  }
  for (let i = 0; i < numbersLength; i++) {
    memPassword += numbers.charAt(getRandomInt(0, 9));
  }

  return memPassword;
}

function generateRandomPassword(settings: PasswordSettings) {
  const passwordLength = settings.passwordLength ?? 16;
  const { withLowercase, withUppercase, withNumbers, withSymbols } = settings;

  const charset =
    (withLowercase ? letters + vocals : '') +
    (withUppercase ? (letters + vocals).toUpperCase() : '') +
    (withNumbers ? numbers : '') +
    (withSymbols ? symbols : '');
  const lastIndexCharset = charset.length - 1;

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += charset.charAt(getRandomInt(0, lastIndexCharset));
  }

  return password;
}

export function generatePassword(settings: PasswordSettings) {
  switch (settings.mode) {
    case 'allChars':
      return generateRandomPassword(settings);
    default:
      return generateMemorablePassword(settings);
  }
}
