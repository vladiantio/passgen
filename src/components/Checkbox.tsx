import { ReactNode, forwardRef } from 'react';

type CheckboxProps = {
  children: ReactNode;
  id: string;
  readOnly?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { children, id, ...restProps } = props;

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox checked:!bg-indigo-600 checked:!border-transparent dark:bg-slate-700 dark:border-slate-600 focus:ring-indigo-600 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 transition rounded mr-2"
        id={id}
        ref={ref}
        {...restProps}
      />
      <label className="flex items-center" htmlFor={id}>
        {children}
      </label>
    </div>
  );
});

export default Checkbox;
