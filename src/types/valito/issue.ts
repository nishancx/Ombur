import { Issue } from "@/types/models/issue";

type Valtio_Current_Issue = {
  currentIssue: Issue | null;
  setCurrentIssue: ({ currentIssue }: { currentIssue: Issue | null }) => void;
};

type Valtio_Issue = {
  usersCurrentIssue: Valtio_Current_Issue;
  clientsCurrentIssue: Valtio_Current_Issue;
};

export type { Valtio_Issue, Valtio_Current_Issue };
