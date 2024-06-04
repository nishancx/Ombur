"use client";

import styles from "./issuesList.module.css";

import { useClientIssues } from "@/queries/issue";
import { IssueTile } from "@/components/issueTile/issueTile";
import { AUTH } from "@/constants/auth";
import { issueStore } from "@/libs/client/stores/issue";

import { Loader } from "lucide-react";
import { Empty } from "antd";
import { isEmpty } from "lodash";

const IssuesList: React.FC = () => {
  const { data, isLoading } = useClientIssues();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader className={styles.loader} />
      </div>
    );
  }

  if (!data || isEmpty(data)) {
    return (
      <div className={styles.container}>
        <Empty description="No issues" className={styles.empty} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data.map((issue) => (
        <IssueTile
          key={issue._id}
          issue={issue}
          sessionType={AUTH.SESSION_TYPES.CLIENT}
          currentIssueStore={issueStore.clientsCurrentIssue}
        />
      ))}
    </div>
  );
};

export { IssuesList };
