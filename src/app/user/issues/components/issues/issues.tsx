import { useState } from "react";
import styles from "./issues.module.css";
import clsx from "clsx";
import { LeftPane } from "../leftPane/leftPane";

type IssuesProps = {
  clientId: string;
  userId: string;
};

const Issues: React.FC<IssuesProps> = ({ clientId, userId }) => {
  const [issueId, setIssueId] = useState<string | null>();

  return (
    <div className={styles.container}>
      <div className={clsx(styles.left, issueId && styles.inactive)}>
        <LeftPane setIssueId={setIssueId} clientId={clientId} userId={userId} />
      </div>
      <div className={clsx(styles.right, !issueId && styles.inactive)}></div>
    </div>
  );
};

export { Issues };
