"use client";

import styles from "./issuesList.module.css";
import { useClientIssues } from "../../queries";

import { IssueTile } from "@/components/issueTile/issueTile";
import { AUTH } from "@/constants/auth";
import { issueStore } from "@/libs/client/stores/issue";
import { Empty } from "@/components/empty/empty";
import { Loading } from "@/components/loading/loading";

import _ from "lodash";
import clsx from "clsx";

type IssuesListProps = {
  className?: string;
};

const IssuesList: React.FC<IssuesListProps> = ({ className }) => {
  const { data, isLoading } = useClientIssues();

  if (isLoading) {
    return (
      <div className={clsx(styles.container, styles.loaderContainer)}>
        <Loading />
      </div>
    );
  }

  if (!data || _.isEmpty(data)) {
    return (
      <div className={styles.container}>
        <Empty description="No issues" />
      </div>
    );
  }

  return (
    <div className={clsx(styles.container, className)}>
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
