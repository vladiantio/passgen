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
          className="form-radio checked:!bg-primary checked:!border-transparent bg-field border-field focus:ring-primary focus:ring-offset-soft shadow transition mr-2"
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
