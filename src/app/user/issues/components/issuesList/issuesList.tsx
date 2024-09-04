"use client";

import styles from "./issuesList.module.css";
import { useUserIssues } from "../../queries";

import { IssueTile } from "@/components/issueTile/issueTile";
import { User } from "@/types/models/user";
import { issueStore } from "@/libs/client/stores/issue";
import { Empty } from "@/components/empty/empty";

import { Loader } from "lucide-react";
import { isEmpty } from "lodash";

type IssuesListProps = {
  clientId: string;
  user: User;
};

const IssuesList: React.FC<IssuesListProps> = ({ clientId, user }) => {
  const { data, isLoading } = useUserIssues({
    clientId,
    userId: user._id,
  });

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
        <Empty description="No issues" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data.map((issue) => (
        <IssueTile
          key={issue._id}
          issue={issue}
          currentIssueStore={issueStore.usersCurrentIssue}
        />
      ))}
    </div>
  );
};

export { IssuesList };
