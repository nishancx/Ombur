"use client";

import styles from "./leftPane.module.css";
import { Button } from "@/components";
import { PlusIcon } from "lucide-react";
import { modalStore } from "@/libs/client";
import { ClientProfile } from "../clientProfile/clientProfile";
import { IssuesList } from "../issuesList/issuesList";

type LeftPaneProps = {
  setIssueId: (issueId: string) => void;
  clientId: string;
  userId: string;
};

const LeftPane: React.FC<LeftPaneProps> = ({ clientId, userId }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <ClientProfile clientId={clientId} />

        <div className={styles.createIssueContainer}>
          <Button
            onClick={() => modalStore.createIssueModal.open({ clientId })}
            className={styles.createIssueButton}
          >
            <div className={styles.createIssueButtonContent}>
              <PlusIcon size={24} />
              <div>Create Issue</div>
            </div>
          </Button>
        </div>

        <IssuesList clientId={clientId} userId={userId} />
      </div>
    </div>
  );
};

export { LeftPane };
