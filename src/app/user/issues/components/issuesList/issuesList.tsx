import styles from "./issuesList.module.css";

type IssuesListProps = {
  setIssueId: (issueId: string) => void;
  clientId: string;
};

const IssuesList: React.FC<IssuesListProps> = ({ setIssueId, clientId }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container}></div>
    </div>
  );
};

export { IssuesList };
