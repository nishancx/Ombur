import { Valtio_Issue } from "@/types";
import { proxy } from "valtio";

const issueStore: Valtio_Issue = proxy<Valtio_Issue>({
  usersCurrentIssue: {
    currentIssue: null,
    setCurrentIssue: ({ currentIssue }) => {
      issueStore.usersCurrentIssue.currentIssue = currentIssue;
    },
  },
});

export { issueStore };
