import { ReactNode } from 'react';

type FrameProps = {
  className?: string;
  children: ReactNode;
};

const Frame = ({ className, children }: FrameProps) => (
  <div
    className={`bg-soft rounded-xl shadow ${className}`}
  >
    {children}
  </div>
);

export default Frame;
