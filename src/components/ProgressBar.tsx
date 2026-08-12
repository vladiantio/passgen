import { AriaAttributes, forwardRef } from 'react';

import { Color } from '@/types/Color';

import styles from './ProgressBar.module.css';

type ProgressBarProps = AriaAttributes & {
  color?: Color;
  min?: number;
  max?: number;
  value: number;
};

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ color, min, max, value, ...restProps }, ref) => {
    let fillClass = styles.fill;

    switch (color) {
      case 'success':
        fillClass = `${styles.fill} ${styles.success}`;
        break;
      case 'danger':
        fillClass = `${styles.fill} ${styles.danger}`;
        break;
      case 'warning':
        fillClass = `${styles.fill} ${styles.warning}`;
        break;
    }

    min = min ?? 0;
    max = max ?? 100;

    const widthPercent = ((value - min) * 100) / (max - min);

    return (
      <div
        className={styles.track}
        role="progressbar"
        ref={ref}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        {...restProps}
      >
        <div
          className={fillClass}
          style={{
            width: `${widthPercent}%`,
          }}
        ></div>
      </div>
    );
  },
);

export default ProgressBar;
