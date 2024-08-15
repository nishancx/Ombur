"use client";

import styles from "./index.module.css";
import { UserLeftPane } from "./leftPane/leftPane";
import { UserRightPane } from "./rightPane/rightPane";

import { User } from "@/types/models/user";
import { issueStore } from "@/libs/client/stores/issue";

import { useSnapshot } from "valtio";
import clsx from "clsx";

type IssuesProps = {
  clientId: string;
  user: User;
};

const Issues: React.FC<IssuesProps> = ({ clientId, user }) => {
  const { currentIssue } = useSnapshot(issueStore.usersCurrentIssue);

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.left, !!currentIssue?._id && styles.inactive)}
      >
        <UserLeftPane clientId={clientId} user={user} />
      </div>
      <div
        className={clsx(styles.right, !currentIssue?._id && styles.inactive)}
      >
        <UserRightPane currentIssue={currentIssue} user={user} />
      </div>
    </div>
  );
};

export { Issues };
