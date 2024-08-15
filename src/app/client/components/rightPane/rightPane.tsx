"use client";

import styles from "./rightPane.module.css";
import { ClientChat } from "../chat/chat";

import { Issue } from "@/types/models/issue";
import { ChatTitleBar } from "@/components/chatTitleBar/chatTitleBar";

import { Empty } from "antd";

type RightPaneProps = {
  currentIssue: Issue | null;
};

const ClientRightPane: React.FC<RightPaneProps> = ({ currentIssue }) => {
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
      <ClientChat currentIssue={currentIssue} />
    </div>
  );
};

export { ClientRightPane };
