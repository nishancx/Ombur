"use client";

import styles from "./client.module.css";
import { LeftPane } from "../leftPane/leftPane";

import { issueStore } from "@/libs/client/stores/issue";

import clsx from "clsx";
import { useSnapshot } from "valtio";

const ClientBlock: React.FC = () => {
  const { currentIssue } = useSnapshot(issueStore.clientsCurrentIssue);

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.left, !!currentIssue?._id && styles.inactive)}
      >
        <LeftPane />
      </div>
      <div
        className={clsx(styles.right, !currentIssue?._id && styles.inactive)}
      >
        {currentIssue?._id}
      </div>
    </div>
  );
};

export { ClientBlock };
