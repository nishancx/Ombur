"use client";

import styles from "./issuesList.module.css";
import { IssueTile } from "../issueTile/issueTile";

import { User } from "@/types/models/user";
import { useUserIssues } from "@/queries/issue";

import { Loader } from "lucide-react";
import { Empty } from "antd";
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
        <Empty description="No issues" className={styles.empty} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data.map((issue) => (
        <IssueTile key={issue._id} issue={issue} />
      ))}
    </div>
  );
};

export { IssuesList };
