import styles from "./issueTile.module.css";
import { Info } from "lucide-react";
import { Issue } from "@/types";
import { issueStore } from "@/libs/client";
import { useSnapshot } from "valtio";

type IssueTileProps = {
  issue: Issue;
};

const IssueTile: React.FC<IssueTileProps> = ({ issue }) => {
  const { currentIssue } = useSnapshot(issueStore.usersCurrentIssue);
  const handleClick = () => {
    issueStore.usersCurrentIssue.setCurrentIssue({ currentIssue: issue });
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.title}>{issue.title}</div>

      <div className={styles.bottom}>
        <div className={styles.type}>{issue.type}</div>

        {currentIssue?._id === issue?._id ? (
          <Info size={18} color="#05608d" className={styles.infoButton} />
        ) : null}
      </div>
    </div>
  );
};

export { IssueTile };
