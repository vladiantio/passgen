import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Color } from '@/types/Color';

type PasswordButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
};

const PasswordButton = forwardRef<HTMLButtonElement, PasswordButtonProps>(
  ({ children, color, className, type, ...restProps }, ref) => (
    <button
      className={`transition !bg-opacity-0 hover:!bg-opacity-10 focus:!bg-opacity-20 focus:outline-none rounded-full p-2 ${color == 'success'
        ? 'text-success bg-success'
        : 'text-accent bg-accent'
        } disabled:!text-muted disabled:hover:!bg-opacity-0 ${className}`}
      type={type ?? 'button'}
      ref={ref}
      {...restProps}
    >
      {children}
    </button>
  ),
);

export default PasswordButton;
