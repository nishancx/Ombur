"use client";

import styles from "./rightPane.module.css";
import { ClientChat } from "../chat/chat";

import { Issue } from "@/types/models/issue";
import { ChatTitleBar } from "@/components/chatTitleBar/chatTitleBar";
import { Empty } from "@/components/empty/empty";

type RightPaneProps = {
  currentIssue: Issue | null;
  authToken: string;
};

const ClientRightPane: React.FC<RightPaneProps> = ({
  currentIssue,
  authToken,
}) => {
  if (currentIssue === undefined) return null;

  if (!currentIssue)
    return <Empty description="Please select an issue or create one." />;

  return (
    <div className={styles.container}>
      <ChatTitleBar currentIssue={currentIssue} sessionType="client" />

      <ClientChat currentIssue={currentIssue} authToken={authToken} />
    </div>
  );
};

export { ClientRightPane };
