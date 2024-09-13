import styles from "./chatTitleBar.module.css";

import { issueStore } from "@/libs/client/stores/issue";
import { modalStore } from "@/libs/client/stores/modal";
import { SessionType } from "@/types/auth";
import { Issue } from "@/types/models/issue";

import { ArrowLeft, Info } from "lucide-react";

type ChatTitleBarProps = {
  currentIssue: Issue;
  sessionType: SessionType;
};

const ChatTitleBar: React.FC<ChatTitleBarProps> = ({
  currentIssue,
  sessionType,
}) => {
  const goBack = () => {
    if (sessionType === "client") {
      return issueStore.clientsCurrentIssue.setCurrentIssue({
        currentIssue: null,
      });
    }

    issueStore.usersCurrentIssue.setCurrentIssue({
      currentIssue: null,
    });
  };

  const infoClick = () => {
    modalStore.issueInfoModal.open({ issue: currentIssue, sessionType });
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={goBack}>
        <ArrowLeft size={25} />
      </div>

      <div className={styles.title}>{currentIssue.title}</div>

      <div className={styles.info} onClick={infoClick}>
        <Info size={18} color="#05608d" />
      </div>
    </div>
  );
};

export { ChatTitleBar };
