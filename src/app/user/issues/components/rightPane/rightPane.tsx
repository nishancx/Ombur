"use client";

import styles from "./rightPane.module.css";
import { Chat } from "../chat/chat";
import { ChatTitleBar } from "../chatTitleBar/chatTitleBar";

import { issueStore } from "@/libs/client/stores/issueStore";
import { User } from "@/types/models/user";

import { Empty } from "antd";
import { useSnapshot } from "valtio";

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
      <ChatTitleBar />
      <Chat />
    </>
  );
};

export { RightPane };
