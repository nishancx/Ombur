import { Valtio_Modals } from "@/types/valito/modals";

import { proxy } from "valtio";

const modalStore: Valtio_Modals = proxy<Valtio_Modals>({
  issueLinkModal: {
    isOpen: false,
    issueLink: "",
    open: ({ issueLink }) => {
      modalStore.issueLinkModal.issueLink = issueLink;
      modalStore.issueLinkModal.isOpen = true;
    },
    close: () => {
      modalStore.issueLinkModal.issueLink = "";
      modalStore.issueLinkModal.isOpen = false;
    },
  },
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
});

export { modalStore };
