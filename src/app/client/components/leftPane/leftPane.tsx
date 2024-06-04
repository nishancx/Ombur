"use client";

import { IssuesList } from "../issuesList/issuesList";
import styles from "./leftPane.module.css";

type LeftPaneProps = {};

const LeftPane: React.FC<LeftPaneProps> = ({}) => {
  return (
    <div className={styles.container}>
      <IssuesList />
    </div>
  );
};

export { LeftPane };
