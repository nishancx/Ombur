import styles from "./fullSpanLoader.module.css";
import clsx from "clsx";
import { Loading } from "../loading/loading";

type FullSpanLoaderProps = {
  containerClassName?: string;
};

const FullSpanLoader: React.FC<FullSpanLoaderProps> = ({
  containerClassName,
}) => {
  return (
    <div className={clsx(styles.container, containerClassName)}>
      <Loading />
    </div>
  );
};

export { FullSpanLoader };
