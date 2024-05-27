import { Issue } from "../models/issue";

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

type IssueInfoModal = ModalProps & {
  issue: null | Issue;
  open: ({ issue }: { issue: Issue }) => void;
};

export type Valtio_Modals = {
  issueLinkModal: IssueLinkModal;
  createIssueModal: CreateIssueModal;
  issueInfoModal: IssueInfoModal;
};
