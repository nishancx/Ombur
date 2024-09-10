"use client";

import { CreateIssueModal } from "./createIssue/createIssue";

import { Session } from "next-auth";

type ModalsProps = {
  session: Session | null;
};

export const Modals: React.FC<ModalsProps> = ({ session }) => {
  return (
    <>
      <CreateIssueModal session={session} />
    </>
  );
};
