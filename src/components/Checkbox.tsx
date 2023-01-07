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
        className="form-checkbox checked:!bg-current checked:!border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:!ring-offset-neutral-800 transition rounded mr-2"
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
