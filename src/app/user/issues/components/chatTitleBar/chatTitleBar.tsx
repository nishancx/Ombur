import styles from "./chatTitleBar.module.css";
import { issueStore } from "@/libs/client/stores/issue";
import { ArrowLeft, Info } from "lucide-react";
import { useSnapshot } from "valtio";

const ChatTitleBar: React.FC = () => {
  const { currentIssue } = useSnapshot(issueStore.usersCurrentIssue);
  const goBack = () => {
    issueStore.usersCurrentIssue.setCurrentIssue({
      currentIssue: null,
    });
  };

  if (!currentIssue) return null;

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
