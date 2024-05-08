import styles from "./issuesList.module.css";
import { useQuery } from "@tanstack/react-query";
import { getClientProfileInfo } from "./serverActions";
import Image from "next/image";
import { Button } from "@/components";
import { PlusIcon } from "lucide-react";

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
      <div className={styles.top}>
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

        <div className={styles.createIssueContainer}>
          <Button onClick={() => {}} className={styles.createIssueButton}>
            <div className={styles.createIssueButtonContent}>
              <PlusIcon size={24} />
              <div>Create Issue</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { IssuesList };
