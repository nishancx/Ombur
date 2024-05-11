"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./issuesList.module.css";
import { getIssuesServerAction } from "../leftPane/serverActions";
import { Loader } from "lucide-react";
import { User } from "@/types";

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
  return <div className={styles.container}>{JSON.stringify(data)}</div>;
};

export { IssuesList };
