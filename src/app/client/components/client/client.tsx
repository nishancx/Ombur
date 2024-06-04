import styles from "./client.module.css";
import { LeftPane } from "../leftPane/leftPane";

import clsx from "clsx";

type ClientBlockProps = {
  currentIssueId: string;
};

const ClientBlock: React.FC<ClientBlockProps> = ({ currentIssueId }) => {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.left, !!currentIssueId && styles.inactive)}>
        <LeftPane />
      </div>
      <div className={clsx(styles.right, !currentIssueId && styles.inactive)}>
        right pane
      </div>
    </div>
  );
};

export { ClientBlock };
