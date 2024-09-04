import styles from "./loading.module.css";

import clsx from "clsx";

type LoadingProps = {
  dotClassName?: string;
  className?: string;
};

const Loading: React.FC<LoadingProps> = ({ className, dotClassName }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={clsx(styles.dot, dotClassName)} />
      <div className={clsx(styles.dot, dotClassName)} />
      <div className={clsx(styles.dot, dotClassName)} />
    </div>
  );
};

export { Loading };
