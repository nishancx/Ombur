import { SessionType } from "../auth";
import { IssueWithUser } from "../models/issue";

type ModalProps = {
  isOpen: boolean;
  close: () => void;
};

type CreateIssueModal = ModalProps & {
  clientId: string;
  open: ({ clientId }: { clientId: string }) => void;
};

type IssueInfoModal = ModalProps & {
  issue: null | IssueWithUser;
  sessionType?: SessionType;
  open: ({
    issue,
    sessionType,
  }: {
    issue: IssueWithUser;
    sessionType?: SessionType;
  }) => void;
};

export type Valtio_Modals = {
  createIssueModal: CreateIssueModal;
  issueInfoModal: IssueInfoModal;
};
