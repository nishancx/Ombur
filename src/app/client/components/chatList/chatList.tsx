"use client";

import styles from "./chatList.module.css";

type ClientChatListProps = {
  issueId: string;
};

const ClientChatList: React.FC<ClientChatListProps> = ({ issueId }) => {
  return <div className={styles.container}>{issueId}</div>;
};

export { ClientChatList };
