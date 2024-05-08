import styles from "./issuesList.module.css";
import { useQuery } from "@tanstack/react-query";
import { getClientProfileInfo } from "./serverActions";
import Image from "next/image";

type IssuesListProps = {
  setIssueId: (issueId: string) => void;
  clientId: string;
};

const IssuesList: React.FC<IssuesListProps> = ({ setIssueId, clientId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["clientProfileInfo", { clientId }],
    queryFn: () => getClientProfileInfo({ clientId }),
  });

  return (
    <div className={styles.container}>
      <div className={styles.clientInfo}>
        {isLoading ? (
          <></>
        ) : (
          <>
            <Image
              src={data.avatar}
              alt="avatar"
              width={50}
              height={50}
              className={styles.clientAvatar}
            />
            <div className={styles.clientName}>{data.name}</div>
          </>
        )}
      </div>
    </div>
  );
};

export { IssuesList };
