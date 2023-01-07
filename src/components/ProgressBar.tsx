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
    let classColor = 'bg-blue-600';

    switch (color) {
      case 'success':
        classColor = 'bg-green-600';
        break;
      case 'danger':
        classColor = 'bg-red-600';
        break;
      case 'warning':
        classColor = 'bg-yellow-500';
        break;
    }

    min = min ?? 0;
    max = max ?? 100;

    const widthPercent = ((value - min) * 100) / (max - min);

    return (
      <div
        className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2.5"
        role="progressbar"
        ref={ref}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        {...restProps}
      >
        <div
          className={`${classColor} h-2.5 rounded-full transition-all duration-300`}
          style={{
            width: `${widthPercent}%`,
          }}
        ></div>
      </div>
    );
  },
);

export default ProgressBar;
