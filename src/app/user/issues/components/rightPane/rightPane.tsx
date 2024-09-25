"use client";

import styles from "./rightPane.module.css";
import { UserChat } from "../chat/chat";

import { ChatTitleBar } from "@/components/chatTitleBar/chatTitleBar";
import { Issue } from "@/types/models/issue";
import { Empty } from "@/components/empty/empty";

import { User } from "next-auth";

type RightPaneProps = {
  currentIssue: Issue | null;
  authToken: string;
};

const UserRightPane: React.FC<RightPaneProps> = ({
  currentIssue,
  authToken,
}) => {
  if (currentIssue === undefined) return null;

  if (!currentIssue)
    return <Empty description="Please select an issue or create one." />;

  return (
    <div className={styles.container}>
      <ChatTitleBar currentIssue={currentIssue} sessionType="user" />

      <UserChat currentIssue={currentIssue} authToken={authToken} />
    </div>
  );
};

export { UserRightPane };
