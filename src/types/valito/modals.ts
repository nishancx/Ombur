type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

type IssueLinkModal = ModalProps & {
  issueLink: string;
  open: ({ issueLink }: { issueLink: string }) => void;
};

type CreateIssueModal = ModalProps & {
  clientId: string;
  open: ({ clientId }: { clientId: string }) => void;
};

export type Valtio_Modals = {
  issueLinkModal: IssueLinkModal;
  createIssueModal: CreateIssueModal;
};
