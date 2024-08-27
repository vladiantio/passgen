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
          className="form-input w-20 dark:bg-slate-800 transition border-slate-200 dark:border-slate-700 rounded-xl shadow"
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
          renderTrack={({ props: { ref, ...restProps }, children }) => (
            <div className="flex-1 flex w-full h-5" {...restProps}>
              <div
                className="self-center w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 relative"
                ref={ref}
              >
                <div
                  className="bg-sky-600 h-2.5 rounded-full"
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
              className="top-0 left-0 w-5 h-5 rounded-full bg-sky-500 shadow-sm transition-shadow focus:outline-none focus:ring-4 focus:ring-sky-600 focus:ring-opacity-40"
            />
          )}
        />
      </div>
    </div>
  );
};

export default PasswordLengthField;
