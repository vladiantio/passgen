import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Color } from '@/types/Color';

type PasswordButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
};

const PasswordButton = forwardRef<HTMLButtonElement, PasswordButtonProps>(
  ({ children, color, className, type, ...restProps }, ref) => (
    <button
      className={`transition !bg-opacity-0 hover:!bg-opacity-10 focus:!bg-opacity-20 focus:outline-none rounded-full p-2 ${color == 'success'
        ? 'text-green-600 bg-green-600'
        : 'text-indigo-700 bg-indigo-700 dark:text-indigo-500 dark:bg-indigo-500'
        } disabled:!text-slate-500 disabled:hover:!bg-opacity-0 ${className}`}
      type={type ?? 'button'}
      ref={ref}
      {...restProps}
    >
      {children}
    </button>
  ),
);

export default PasswordButton;
