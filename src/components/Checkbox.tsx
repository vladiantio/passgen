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
        className="form-checkbox checked:!bg-accent checked:!border-transparent bg-field border-field focus:ring-accent focus:ring-offset-soft shadow transition rounded mr-2"
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
