"use client";

import styles from "./chat.module.css";

import { issueStore } from "@/libs/client/stores/issue";
import { Issue } from "@/types/models/issue";

import { useSnapshot } from "valtio";

type ChatProps = {
  currentIssue: Issue;
};

const Chat: React.FC<ChatProps> = ({ currentIssue }) => {
  return <div className={styles.container}>{currentIssue._id}</div>;
};

export { Chat };
