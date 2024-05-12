"use client";

import styles from "./leftPane.module.css";
import { Button } from "@/components";
import { ClientProfile, IssuesList } from "..";
import { PlusIcon } from "lucide-react";
import { modalStore } from "@/libs/client";
import { User } from "@/types";

type LeftPaneProps = {
  clientId: string;
  user: User;
};

const LeftPane: React.FC<LeftPaneProps> = ({ clientId, user }) => {
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

      <IssuesList clientId={clientId} user={user} />
    </div>
  );
};

export { LeftPane };
