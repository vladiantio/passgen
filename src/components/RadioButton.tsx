import { ReactNode, forwardRef } from 'react';

import styles from './RadioButton.module.css';

type RadioButtonProps = {
  children: ReactNode;
  id: string;
  readOnly?: boolean;
  value?: string | number | readonly string[];
};

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => {
    const { children, id, ...restProps } = props;

    return (
      <div className={styles.row}>
        <input
          type="radio"
          className={styles.radio}
          id={id}
          ref={ref}
          {...restProps}
        />
        <label className={styles.label} htmlFor={id}>
          {children}
        </label>
      </div>
    );
  },
);

export default RadioButton;
