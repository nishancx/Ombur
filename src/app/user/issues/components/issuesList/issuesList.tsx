"use client";

import styles from "./issuesList.module.css";
import { useUserIssues } from "../../queries";

import { IssueTile } from "@/components/issueTile/issueTile";
import { issueStore } from "@/libs/client/stores/issue";
import { Empty } from "@/components/empty/empty";

import _ from "lodash";
import { User } from "next-auth";
import { Loading } from "@/components/loading/loading";
import { Checkbox } from "antd";
import { useState } from "react";

type IssuesListProps = {
  clientId: string;
  user: User;
};

const IssuesList: React.FC<IssuesListProps> = ({ clientId, user }) => {
  const { data, isLoading } = useUserIssues({
    clientId,
    userId: user.id || "",
  });
  const [showResolved, setShowResolved] = useState(false);
  const dataForCurrentResolutionStatus = data?.filter(
    (issue) => issue.resolved === showResolved
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading className={styles.loader} />
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
    <div className={styles.container}>
      {!!data.length && (
        <div className={styles.resolvedContainer}>
          <div>Show resolved</div>
          <Checkbox
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
          />
        </div>
      )}

      {!dataForCurrentResolutionStatus?.length && (
        <div className={styles.innerEmptyContainer}>
          <Empty description="No issues" />
        </div>
      )}

      {dataForCurrentResolutionStatus?.map((issue) => (
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
