import { ControllerRenderProps } from 'react-hook-form';
import { Range } from 'react-range';

type PasswordLengthFieldProps = {
  field: ControllerRenderProps<any, any>;
};

const PasswordLengthField = ({ field }: PasswordLengthFieldProps) => {
  const min = 4,
    max = 64;
  const widthPercent = ((field.value - min) * 100) / (max - min);
  return (
    <div className="flex-none flex flex-col space-y-2">
      <label htmlFor="inputPasswordLength">Longitud</label>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          className="form-input w-20 dark:bg-neutral-800 transition border-neutral-200 dark:border-neutral-700 rounded-xl shadow"
          id="inputPasswordLength"
          min={min}
          max={max}
          {...field}
        />
        <Range
          values={[field.value]}
          step={1}
          min={min}
          max={max}
          onChange={(values) => {
            if (field.value != values[0])
              field.onChange({ target: { value: values[0] } });
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="flex-1 flex w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2.5"
            >
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${widthPercent}%`,
                }}
              ></div>
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="w-5 h-5 rounded-full bg-blue-600 shadow-sm transition-shadow focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-40"
            />
          )}
        />
      </div>
    </div>
  );
};

export default PasswordLengthField;
