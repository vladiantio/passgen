import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Color } from '@/types/Color';

import styles from './PasswordButton.module.css';

type PasswordButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
};

const PasswordButton = forwardRef<HTMLButtonElement, PasswordButtonProps>(
  ({ children, color, className, type, ...restProps }, ref) => (
    <button
      className={`${styles.button}${
        color == 'success' ? ` ${styles.success}` : ''
      } ${className}`}
      type={type ?? 'button'}
      ref={ref}
      {...restProps}
    >
      {children}
    </button>
  ),
);

export default PasswordButton;
