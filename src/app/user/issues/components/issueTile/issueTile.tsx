import styles from "./issueTile.module.css";
import { Info } from "lucide-react";
import { Issue } from "@/types";

type IssueTileProps = {
  issue: Issue;
};

const IssueTile: React.FC<IssueTileProps> = ({ issue }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{issue.title}</div>

      <div className={styles.bottom}>
        <div className={styles.type}>{issue.type}</div>

        <Info size={18} color="#05608d" />
      </div>
    </div>
  );
};

export { IssueTile };
