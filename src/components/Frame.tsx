import { ReactNode } from 'react';

type FrameProps = {
  className?: string;
  children: ReactNode;
};

const Frame = ({ className, children }: FrameProps) => (
  <div
    className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow ${className}`}
  >
    {children}
  </div>
);

export default Frame;
