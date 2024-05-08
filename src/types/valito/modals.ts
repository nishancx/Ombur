type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

type IssueLinkModal = ModalProps & {
  issueLink: string;
  open: ({ issueLink }: { issueLink: string }) => void;
};

export type Valtio_Modals = {
  issueLinkModal: IssueLinkModal;
};
