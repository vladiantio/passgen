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
          className="w-max max-w-xs backdrop-blur bg-white !bg-opacity-60 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm shadow py-2 px-3 !m-0 z-50"
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
