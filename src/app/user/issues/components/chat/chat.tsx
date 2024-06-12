"use client";

import styles from "./chat.module.css";

import { ChatInput } from "@/components/chatInput/chatInput";
import { Issue } from "@/types/models/issue";

type ChatProps = {
  currentIssue: Issue;
};

const Chat: React.FC<ChatProps> = ({ currentIssue }) => {
  return (
    <div className={styles.container}>
      <div className={styles.messageList}>{currentIssue._id}</div>

      <ChatInput onSendMessage={(message) => console.log(message)} />
    </div>
  );
};

export { Chat };
