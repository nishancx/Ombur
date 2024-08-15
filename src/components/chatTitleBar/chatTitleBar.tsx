import styles from "./chatTitleBar.module.css";

import { issueStore } from "@/libs/client/stores/issue";
import { Issue } from "@/types/models/issue";

import { ArrowLeft, Info } from "lucide-react";

type ChatTitleBarProps = {
  currentIssue: Issue;
};

const ChatTitleBar: React.FC<ChatTitleBarProps> = ({ currentIssue }) => {
  const goBack = () => {
    issueStore.usersCurrentIssue.setCurrentIssue({
      currentIssue: null,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={goBack}>
        <ArrowLeft size={25} />
      </div>
      <div className={styles.title}>{currentIssue.title}</div>
      <div className={styles.info}>
        <Info size={18} color="#05608d" />
      </div>
    </div>
  );
};

export { ChatTitleBar };
