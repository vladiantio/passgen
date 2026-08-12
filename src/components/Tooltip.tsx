import {
  Placement,
  flip,
  offset,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { ReactElement, ReactNode, cloneElement, useState } from 'react';

import styles from './Tooltip.module.css';

type TooltipProps = {
  children: ReactElement;
  content: ReactNode;
  placement?: Placement;
};

const Tooltip = ({ children, content, placement }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const { context, x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(6), flip(), shift({ padding: 5 })],
  });
  const hover = useHover(context);
  const focus = useFocus(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
  ]);

  const newChildProps = {
    ref: reference,
    ...getReferenceProps(children.props),
  };

  return (
    <>
      {cloneElement(children, newChildProps)}
      {open && (
        <div
          className={styles.tooltip}
          ref={floating}
          role="tooltip"
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
