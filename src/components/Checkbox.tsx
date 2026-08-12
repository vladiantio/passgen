import { ReactNode, forwardRef } from 'react';

import styles from './Checkbox.module.css';

type CheckboxProps = {
  children: ReactNode;
  id: string;
  readOnly?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { children, id, ...restProps } = props;

  return (
    <div className={styles.row}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id={id}
        ref={ref}
        {...restProps}
      />
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
    </div>
  );
});

export default Checkbox;
