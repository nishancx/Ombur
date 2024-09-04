"use client";

import styles from "./leftPane.module.css";
import { ClientProfile } from "../clientProfile/clientProfile";
import { IssuesList } from "../issuesList/issuesList";

import { Button } from "@/components/button/button";
import { modalStore } from "@/libs/client/stores/modal";

import { PlusIcon } from "lucide-react";
import { User } from "next-auth";

type LeftPaneProps = {
  clientId: string;
  user: User;
};

const UserLeftPane: React.FC<LeftPaneProps> = ({ clientId, user }) => {
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

export { UserLeftPane };
