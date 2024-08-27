import { ReactNode, forwardRef } from 'react';

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
      <div className="flex items-center">
        <input
          type="radio"
          className="form-radio checked:!bg-blue-600 checked:!border-transparent dark:bg-slate-700 dark:border-slate-600 focus:ring-blue-600 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 transition mr-2"
          id={id}
          ref={ref}
          {...restProps}
        />
        <label className="flex items-center" htmlFor={id}>
          {children}
        </label>
      </div>
    );
  },
);

export default RadioButton;
