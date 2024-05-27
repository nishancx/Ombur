"use client";

import { CreateIssueModal } from "./createIssue/createIssue";
import { IssueInfoModal } from "./issueInfo/issueInfo";

export const Modals = () => {
  return (
    <>
      <CreateIssueModal />
      <IssueInfoModal />
    </>
  );
};
