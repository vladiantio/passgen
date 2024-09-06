import { AriaAttributes, forwardRef } from 'react';

import { Color } from '@/types/Color';

type ProgressBarProps = AriaAttributes & {
  color?: Color;
  min?: number;
  max?: number;
  value: number;
};

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ color, min, max, value, ...restProps }, ref) => {
    let classColor = 'from-secondary to-accent';

    switch (color) {
      case 'success':
        classColor = 'from-success to-success';
        break;
      case 'danger':
        classColor = 'from-danger to-danger';
        break;
      case 'warning':
        classColor = 'from-warning to-warning';
        break;
    }

    min = min ?? 0;
    max = max ?? 100;

    const widthPercent = ((value - min) * 100) / (max - min);

    return (
      <div
        className="w-full bg-field rounded-full h-2.5"
        role="progressbar"
        ref={ref}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        {...restProps}
      >
        <div
          className={`bg-gradient-to-r ${classColor} h-2.5 rounded-full transition-all duration-300`}
          style={{
            width: `${widthPercent}%`,
          }}
        ></div>
      </div>
    );
  },
);

export default ProgressBar;
