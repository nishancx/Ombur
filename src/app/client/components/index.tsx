"use client";

import styles from "./index.module.css";
import { ClientLeftPane } from "./leftPane/leftPane";
import { ClientRightPane } from "./rightPane/rightPane";

import { issueStore } from "@/libs/client/stores/issue";

import clsx from "clsx";
import { useSnapshot } from "valtio";

const ClientPageContent: React.FC = () => {
  const { currentIssue } = useSnapshot(issueStore.clientsCurrentIssue);

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.left, !!currentIssue?._id && styles.inactive)}
      >
        <ClientLeftPane />
      </div>
      <div
        className={clsx(styles.right, !currentIssue?._id && styles.inactive)}
      >
        <ClientRightPane currentIssue={currentIssue} />
      </div>
    </div>
  );
};

export { ClientPageContent };
