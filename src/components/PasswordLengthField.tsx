import { ControllerRenderProps } from 'react-hook-form';
import { Range } from 'react-range';

import {
  PasswordSettings,
  defaultPasswordLength,
} from '@/utils/PasswordGenerator';

import styles from './PasswordLengthField.module.css';

type PasswordLengthFieldProps = {
  field: ControllerRenderProps<PasswordSettings, 'passwordLength'>;
};

const PasswordLengthField = ({ field }: PasswordLengthFieldProps) => {
  const min = 4,
    max = 64,
    value = field.value ?? defaultPasswordLength;
  const widthPercent = ((value - min) * 100) / (max - min);
  return (
    <div className={styles.group}>
      <label htmlFor="inputPasswordLength">Longitud</label>
      <div className={styles.row}>
        <input
          type="number"
          className={styles.input}
          id="inputPasswordLength"
          min={min}
          max={max}
          {...field}
        />
        <Range
          values={[value]}
          step={1}
          min={min}
          max={max}
          onChange={(values) => {
            if (value != values[0])
              field.onChange({ target: { value: values[0] } });
          }}
          renderTrack={({ props: { ref, ...restProps }, children }) => (
            <div className={styles.trackArea} {...restProps}>
              <div className={styles.track} ref={ref}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${widthPercent}%`,
                  }}
                ></div>
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className={styles.thumb} />
          )}
        />
      </div>
    </div>
  );
};

export default PasswordLengthField;
