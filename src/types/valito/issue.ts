import { Issue } from "@/types/models/issue";

type Valtio_Users_Current_Issue = {
  currentIssue: Issue | null;
  setCurrentIssue: ({ currentIssue }: { currentIssue: Issue | null }) => void;
};

type Valtio_Issue = {
  usersCurrentIssue: Valtio_Users_Current_Issue;
};

export type { Valtio_Issue, Valtio_Users_Current_Issue };
