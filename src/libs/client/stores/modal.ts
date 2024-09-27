import { Valtio_Modals } from "@/types/valito/modals";

import { proxy } from "valtio";

const modalStore: Valtio_Modals = proxy<Valtio_Modals>({
  createIssueModal: {
    isOpen: false,
    clientId: "",
    open: ({ clientId }) => {
      modalStore.createIssueModal.clientId = clientId;
      modalStore.createIssueModal.isOpen = true;
    },
    close: () => {
      modalStore.createIssueModal.clientId = "";
      modalStore.createIssueModal.isOpen = false;
    },
  },
  issueInfoModal: {
    isOpen: false,
    issue: null,
    sessionType: undefined,
    open: ({ issue, sessionType }) => {
      modalStore.issueInfoModal.issue = issue;
      modalStore.issueInfoModal.isOpen = true;
      modalStore.issueInfoModal.sessionType = sessionType;
    },
    close: () => {
      modalStore.issueInfoModal.issue = null;
      modalStore.issueInfoModal.isOpen = false;
      modalStore.issueInfoModal.sessionType = undefined;
    },
  },
});

export { modalStore };
