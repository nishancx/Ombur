import styles from "./fullSpanLoader.module.css";
import clsx from "clsx";
import { Loading } from "../loading/loading";

type FullSpanLoaderProps = {
  containerClassName?: string;
  dotClassName?: string;
};

const FullSpanLoader: React.FC<FullSpanLoaderProps> = ({
  containerClassName,
  dotClassName,
}) => {
  return (
    <div className={clsx(styles.container, containerClassName)}>
      <Loading dotClassName={dotClassName} />
    </div>
  );
};

export { FullSpanLoader };
