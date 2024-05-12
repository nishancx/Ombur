"use client";

import styles from "./rightPane.module.css";
import { issueStore } from "@/libs/client";
import { User } from "@/types";
import { Empty } from "antd";
import { useSnapshot } from "valtio";
import { Chat, ChatTitleBar } from "..";

type RightPaneProps = {
  user: User;
};

const RightPane: React.FC<RightPaneProps> = ({ user }) => {
  const { currentIssue } = useSnapshot(issueStore.usersCurrentIssue);

  if (currentIssue === undefined) return null;

  if (!currentIssue)
    return (
      <Empty
        description="Please select an issue or create one."
        className={styles.empty}
      />
    );

  return (
    <>
      <ChatTitleBar title={currentIssue.title} />
      <Chat />
    </>
  );
};

export { RightPane };
