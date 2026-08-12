import { ReactNode } from 'react';

import styles from './Frame.module.css';

type FrameProps = {
  className?: string;
  children: ReactNode;
};

const Frame = ({ className, children }: FrameProps) => (
  <div className={`${styles.frame} ${className}`}>{children}</div>
);

export default Frame;
