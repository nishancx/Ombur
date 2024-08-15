"use client";

import styles from "./rightPane.module.css";
import { UserChat } from "../chat/chat";

import { User } from "@/types/models/user";
import { ChatTitleBar } from "@/components/chatTitleBar/chatTitleBar";
import { Issue } from "@/types/models/issue";

import { Empty } from "antd";

type RightPaneProps = {
  user: User;
  currentIssue: Issue | null;
};

const UserRightPane: React.FC<RightPaneProps> = ({ user, currentIssue }) => {
  if (currentIssue === undefined) return null;

  if (!currentIssue)
    return (
      <Empty
        description="Please select an issue or create one."
        className={styles.empty}
      />
    );

  return (
    <div className={styles.container}>
      <ChatTitleBar currentIssue={currentIssue} />

      <UserChat currentIssue={currentIssue} />
    </div>
  );
};

export { UserRightPane };
