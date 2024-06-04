import { Valtio_Issue } from "@/types/valito/issue";

import { proxy } from "valtio";

const issueStore: Valtio_Issue = proxy<Valtio_Issue>({
  usersCurrentIssue: {
    currentIssue: null,
    setCurrentIssue: ({ currentIssue }) => {
      issueStore.usersCurrentIssue.currentIssue = currentIssue;
    },
  },
  clientsCurrentIssue: {
    currentIssue: null,
    setCurrentIssue: ({ currentIssue }) => {
      issueStore.clientsCurrentIssue.currentIssue = currentIssue;
    },
  },
});

export { issueStore };
