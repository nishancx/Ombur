"use client";

import styles from "./issueTile.module.css";

import { Issue, IssueWithUser } from "@/types/models/issue";
import { modalStore } from "@/libs/client/stores/modal";
import { SessionType } from "@/types/auth";
import { AUTH } from "@/constants/auth";

import { Info, UserCircle } from "lucide-react";
import { useSnapshot } from "valtio";

type IssueTileProps = {
  issue: IssueWithUser;
  sessionType?: SessionType;
  currentIssueStore: any;
};

const IssueTile: React.FC<IssueTileProps> = ({
  issue,
  sessionType,
  currentIssueStore,
}) => {
  const { currentIssue } = useSnapshot(currentIssueStore);

  const click = () => {
    currentIssueStore.setCurrentIssue({ currentIssue: issue });
  };

  const infoClick = ({ issue }: { issue: Issue }) => {
    modalStore.issueInfoModal.open({ issue, sessionType });
  };

  return (
    <div className={styles.container} onClick={click}>
      <div className={styles.title}>{issue.title}</div>

      <div className={styles.bottom}>
        <div className={styles.type}>{issue.type}</div>

        {sessionType === AUTH.SESSION_TYPES.CLIENT && (
          <div className={styles.type}>
            <UserCircle size={18} />
            <div className={styles.typeName}>{issue.user?.name}</div>
          </div>
        )}

        {currentIssue?._id === issue?._id ? (
          <div className={styles.infoButton}>
            <Info
              size={18}
              color="#05608d"
              onClick={() => infoClick({ issue })}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { IssueTile };
