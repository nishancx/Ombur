"use client";

import styles from "./rightPane.module.css";
import { Chat } from "../chat/chat";
import { ChatTitleBar } from "../chatTitleBar/chatTitleBar";

import { User } from "@/types/models/user";

import { Empty } from "antd";
import { Issue } from "@/types/models/issue";

type RightPaneProps = {
  user: User;
  currentIssue: Issue | null;
};

const RightPane: React.FC<RightPaneProps> = ({ user, currentIssue }) => {
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
      <Chat currentIssue={currentIssue} />
    </div>
  );
};

export { RightPane };
