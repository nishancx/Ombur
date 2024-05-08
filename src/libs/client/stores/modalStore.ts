import { Valtio_Modals } from "@/types";
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
});

export { modalStore };
