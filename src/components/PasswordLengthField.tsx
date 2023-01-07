import { ControllerRenderProps } from 'react-hook-form';

type PasswordLengthFieldProps = {
  field: ControllerRenderProps<any, any>;
};

const PasswordLengthField = ({ field }: PasswordLengthFieldProps) => {
  const min = 4, max = 64;
  return (
    <div className="flex-none flex flex-col space-y-2">
      <label htmlFor="inputPasswordLength">Longitud</label>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          className="form-input dark:bg-neutral-800 transition border-neutral-200 dark:border-neutral-700 rounded-xl shadow"
          id="inputPasswordLength"
          min={min}
          max={max}
          {...field}
        />
        <input
          type="range"
          className="flex-1"
          id="rangePasswordLength"
          min={min}
          max={max}
          {...field}
        />
      </div>
    </div>
  );
};

export default PasswordLengthField;
