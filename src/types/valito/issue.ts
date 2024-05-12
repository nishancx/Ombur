import { Issue } from "@/types/models";

type Valtio_Users_Current_Issue = {
  currentIssue: Issue | null;
  setCurrentIssue: ({ currentIssue }: { currentIssue: Issue | null }) => void;
};

export type Valtio_Issue = {
  usersCurrentIssue: Valtio_Users_Current_Issue;
};
