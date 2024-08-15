"use client";

import { IssuesList } from "../issuesList/issuesList";
import styles from "./leftPane.module.css";

type LeftPaneProps = {};

const ClientLeftPane: React.FC<LeftPaneProps> = ({}) => {
  return (
    <div className={styles.container}>
      <IssuesList className={styles.issuesList} />
    </div>
  );
};

export { ClientLeftPane };
