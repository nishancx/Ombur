"use client";

import styles from "./issueTile.module.css";

import { Issue } from "@/types/models/issue";
import { modalStore } from "@/libs/client/stores/modal";
import { SessionType } from "@/types/auth";

import { Info } from "lucide-react";
import { useSnapshot } from "valtio";

type IssueTileProps = {
  issue: Issue;
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

        {currentIssue?._id === issue?._id ? (
          <Info
            size={18}
            color="#05608d"
            className={styles.infoButton}
            onClick={() => infoClick({ issue })}
          />
        ) : null}
      </div>
    </div>
  );
};

export { IssueTile };
