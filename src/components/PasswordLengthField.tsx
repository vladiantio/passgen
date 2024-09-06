import { ControllerRenderProps } from 'react-hook-form';
import { Range } from 'react-range';

import {
  PasswordSettings,
  defaultPasswordLength,
} from '@/utils/PasswordGenerator';

type PasswordLengthFieldProps = {
  field: ControllerRenderProps<PasswordSettings, 'passwordLength'>;
};

const PasswordLengthField = ({ field }: PasswordLengthFieldProps) => {
  const min = 4,
    max = 64,
    value = field.value ?? defaultPasswordLength;
  const widthPercent = ((value - min) * 100) / (max - min);
  return (
    <div className="flex-none flex flex-col space-y-2">
      <label htmlFor="inputPasswordLength">Longitud</label>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          className="form-input w-20 bg-field border-field transition rounded-xl shadow focus:border-secondary focus:ring-secondary"
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
            <div className="flex-1 flex w-full h-5" {...restProps}>
              <div
                className="self-center w-full bg-field shadow rounded-full h-2.5 relative"
                ref={ref}
              >
                <div
                  className="bg-secondary h-2.5 rounded-full"
                  style={{
                    width: `${widthPercent}%`,
                  }}
                ></div>
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="top-0 left-0 w-5 h-5 rounded-full bg-secondary shadow transition-shadow focus:outline-none focus:ring-4 focus:ring-secondary focus:ring-opacity-40"
            />
          )}
        />
      </div>
    </div>
  );
};

export default PasswordLengthField;
