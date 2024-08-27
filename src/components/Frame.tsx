import { ReactNode } from 'react';

type FrameProps = {
  className?: string;
  children: ReactNode;
};

const Frame = ({ className, children }: FrameProps) => (
  <div
    className={`bg-white !bg-opacity-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl shadow ${className}`}
  >
    {children}
  </div>
);

export default Frame;
