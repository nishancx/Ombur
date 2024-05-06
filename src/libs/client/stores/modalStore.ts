import { Modals } from "@/interfaces";
import { proxy } from "valtio";

const modalStore: Modals = proxy<Modals>({
  issueLinkModal: {
    isOpen: false,
    open: () => (modalStore.issueLinkModal.isOpen = true),
    handleClose: () => (modalStore.issueLinkModal.isOpen = false),
    issueLink: "",
    setIssueLink: ({ issueLink }) =>
      (modalStore.issueLinkModal.issueLink = issueLink),
  },
});

export { modalStore };
