type ModalProps = {
  isOpen: boolean;
  open: () => void;
  handleClose: () => void;
};

type IssueLinkModal = ModalProps & {
  issueLink: string;
  setIssueLink: ({ issueLink }: { issueLink: string }) => void;
};

export type Modals = {
  issueLinkModal: IssueLinkModal;
};
