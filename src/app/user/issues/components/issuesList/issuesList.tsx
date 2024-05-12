"use client";

import styles from "./issuesList.module.css";
import { useQuery } from "@tanstack/react-query";
import { getIssuesServerAction } from "../leftPane/serverActions";
import { Loader } from "lucide-react";
import { User } from "@/types";
import { Empty } from "antd";
import { IssueTile } from "../issueTile/issueTile";

type IssuesListProps = {
  clientId: string;
  user: User;
};

const IssuesList: React.FC<IssuesListProps> = ({ clientId, user }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getIssues", clientId, user._id],
    queryFn: async () =>
      await getIssuesServerAction({ clientId, userId: user._id }),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
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
