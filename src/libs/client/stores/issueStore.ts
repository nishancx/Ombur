import { Valtio_Issue } from "@/types";
import { proxy } from "valtio";

const issueStore: Valtio_Issue = proxy<Valtio_Issue>({
  valtioUsersCurrentIssue: {
    currentIssue: null,
    setCurrentIssue: ({ currentIssue }) => {
      issueStore.valtioUsersCurrentIssue.currentIssue = currentIssue;
    },
  },
});

export { issueStore };
