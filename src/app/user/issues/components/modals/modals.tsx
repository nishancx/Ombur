"use client";

import { CreateIssueModal } from "./createIssue/createIssue";

import { AuthSession } from "@/types/auth";

type ModalsProps = {
  session: AuthSession | null;
};

export const Modals: React.FC<ModalsProps> = ({ session }) => {
  return (
    <>
      <CreateIssueModal session={session} />
    </>
  );
};
