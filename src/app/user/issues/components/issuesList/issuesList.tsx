"use client";

import styles from "./issuesList.module.css";
import { Button } from "@/components";
import { PlusIcon } from "lucide-react";
import { modalStore } from "@/libs/client";
import { ClientProfile } from "../clientProfile/clientProfile";

type IssuesListProps = {
  setIssueId: (issueId: string) => void;
  clientId: string;
};

const IssuesList: React.FC<IssuesListProps> = ({ clientId }) => {
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
      </div>
    </div>
  );
};

export { IssuesList };
