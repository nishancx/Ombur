"use client";

import { IssueLinkModal } from "./issueLink/issueLink";

import { IssueInfoModal } from "@/app/components/modals/issueInfo/issueInfo";

export const Modals = () => {
  return (
    <>
      <IssueLinkModal />
      <IssueInfoModal />
    </>
  );
};
