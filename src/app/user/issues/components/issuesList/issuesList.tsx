"use client";

import styles from "./issuesList.module.css";
import { IssueTile } from "../issueTile/issueTile";
import { getIssuesServerAction } from "../leftPane/serverActions";

import { User } from "@/types/models/user";

import { Loader } from "lucide-react";
import { Empty } from "antd";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { QUERY } from "@/constants/query";

type IssuesListProps = {
  clientId: string;
  user: User;
};

const IssuesList: React.FC<IssuesListProps> = ({ clientId, user }) => {
  const { data, isLoading } = useQuery({
    queryKey: QUERY.QUERY_KEYS.GET_ISSUES({ clientId, userId: user._id }),
    queryFn: async () =>
      await getIssuesServerAction({ clientId, userId: user._id }),
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
