"use client";

import styles from "./rightPane.module.css";
import { Chat } from "../chat/chat";

import { Issue } from "@/types/models/issue";
import { ChatTitleBar } from "@/app/user/issues/components/chatTitleBar/chatTitleBar";

import { Empty } from "antd";

type RightPaneProps = {
  currentIssue: Issue | null;
};

const RightPane: React.FC<RightPaneProps> = ({ currentIssue }) => {
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
