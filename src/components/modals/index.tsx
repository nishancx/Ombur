"use client";

import { CreateIssueModal } from "./createIssue/createIssue";
import { IssueLinkModal } from "./issueLink/issueLink";

export const Modals = () => {
  return (
    <>
      <IssueLinkModal />
      <CreateIssueModal />
    </>
  );
};
