import styles from "./issues.module.css";
import clsx from "clsx";
import { useState } from "react";
import { LeftPane } from "..";
import { User } from "@/types";
import { useSnapshot } from "valtio";
import { issueStore } from "@/libs/client";

type IssuesProps = {
  clientId: string;
  user: User;
};

const Issues: React.FC<IssuesProps> = ({ clientId, user }) => {
  const { currentIssue } = useSnapshot(issueStore.valtioUsersCurrentIssue);

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.left, !!currentIssue?._id && styles.inactive)}
      >
        <LeftPane clientId={clientId} user={user} />
      </div>
      <div
        className={clsx(styles.right, !currentIssue?._id && styles.inactive)}
      ></div>
    </div>
  );
};

export { Issues };
