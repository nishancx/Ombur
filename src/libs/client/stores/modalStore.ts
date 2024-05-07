import { Valtio_Modals } from "@/types";
import { proxy } from "valtio";

const modalStore: Valtio_Modals = proxy<Valtio_Modals>({
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
