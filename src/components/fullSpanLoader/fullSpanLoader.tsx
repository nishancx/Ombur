import { Loader } from "lucide-react";
import styles from "./fullSpanLoader.module.css";
import clsx from "clsx";

type FullSpanLoaderProps = {
  containerClassName?: string;
};

const FullSpanLoader: React.FC<FullSpanLoaderProps> = ({
  containerClassName,
}) => {
  return (
    <div className={clsx(styles.container, containerClassName)}>
      <Loader size={50} />
    </div>
  );
};

export { FullSpanLoader };
