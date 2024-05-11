"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./issuesList.module.css";
import { getIssuesServerAction } from "../leftPane/serverActions";
import { Loader } from "lucide-react";

type IssuesListProps = {
  clientId: string;
  userId: string;
};

const IssuesList: React.FC<IssuesListProps> = ({ clientId, userId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getIssues", clientId, userId],
    queryFn: () => getIssuesServerAction({ clientId, userId }),
  });

  if (isLoading) {
    return <Loader />;
  }
  return <div className={styles.container}>{JSON.stringify(data)}</div>;
};

export { IssuesList };
