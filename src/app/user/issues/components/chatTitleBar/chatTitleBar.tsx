import { issueStore } from "@/libs/client";
import styles from "./chatTitleBar.module.css";
import { ArrowLeft } from "lucide-react";

type ChatTitleBar = {
  title: string;
};

const ChatTitleBar: React.FC<ChatTitleBar> = ({ title }) => {
  const goBack = () => {
    issueStore.valtioUsersCurrentIssue.setCurrentIssue({
      currentIssue: null,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={goBack}>
        <ArrowLeft size={24} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.rightFiller}></div>
    </div>
  );
};

export { ChatTitleBar };
