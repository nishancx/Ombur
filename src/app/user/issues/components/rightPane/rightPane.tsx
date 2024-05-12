"use client";

import styles from "./rightPane.module.css";
import { issueStore } from "@/libs/client";
import { User } from "@/types";
import { Empty } from "antd";
import { useSnapshot } from "valtio";

type RightPaneProps = {
  user: User;
};

const RightPane: React.FC<RightPaneProps> = ({ user }) => {
  const { currentIssue } = useSnapshot(issueStore.valtioUsersCurrentIssue);

  if (currentIssue === undefined) return null;

  if (!currentIssue)
    return (
      <Empty
        description="Please select an issue or create one."
        className={styles.empty}
      />
    );

  return <div>{JSON.stringify(currentIssue)}</div>;
};

export { RightPane };
