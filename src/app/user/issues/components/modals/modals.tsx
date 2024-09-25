"use client";

import { CreateIssueModal } from "./createIssue/createIssue";

import { IssueInfoModal } from "@/app/components/modals/issueInfo/issueInfo";
import { AuthSession } from "@/types/auth";

type ModalsProps = {
  session: AuthSession | null;
};

export const Modals: React.FC<ModalsProps> = ({ session }) => {
  return (
    <>
      <CreateIssueModal session={session} />
      <IssueInfoModal />
    </>
  );
};
