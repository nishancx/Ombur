"use client";

import styles from "./chat.module.css";
import { issueStore } from "@/libs/client";
import { useSnapshot } from "valtio";

const Chat: React.FC = () => {
  const { currentIssue } = useSnapshot(issueStore.usersCurrentIssue);

  if (!currentIssue) return null;

  return <div className={styles.container}>{currentIssue._id}</div>;
};

export { Chat };
