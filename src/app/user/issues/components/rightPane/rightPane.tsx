import { issueStore } from "@/libs/client";
import { User } from "@/types";
import { useSnapshot } from "valtio";

type RightPaneProps = {
  user: User;
};

const RightPane: React.FC<RightPaneProps> = ({ user }) => {
  const { currentIssue } = useSnapshot(issueStore.valtioUsersCurrentIssue);

  return <div>{JSON.stringify(currentIssue)}</div>;
};

export { RightPane };
