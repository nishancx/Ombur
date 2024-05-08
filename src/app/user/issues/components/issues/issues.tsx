import { useState } from "react";
import styles from "./issues.module.css";
import clsx from "clsx";
import { IssuesList } from "../issuesList/issuesList";

type IssuesProps = {
  clientId: string;
};

const Issues: React.FC<IssuesProps> = ({ clientId }) => {
  const [issueId, setIssueId] = useState<string | null>();

  return (
    <div className={styles.container}>
      <div className={clsx(styles.left, issueId && styles.inactive)}>
        <IssuesList setIssueId={setIssueId} clientId={clientId} />
      </div>
      <div className={clsx(styles.right, !issueId && styles.inactive)}></div>
    </div>
  );
};

export { Issues };