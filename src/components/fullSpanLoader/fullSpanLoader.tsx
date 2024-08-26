import { Loader } from "lucide-react";
import styles from "./fullSpanLoader.module.css";

const FullSpanLoader: React.FC = () => {
  return (
    <div className={styles.container}>
      <Loader size={50} />
    </div>
  );
};

export { FullSpanLoader };
