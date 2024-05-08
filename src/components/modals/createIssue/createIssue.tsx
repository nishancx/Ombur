import { modalStore } from "@/libs/client";
import { Modal } from "antd";
import { useSnapshot } from "valtio";
import styles from "./createIssue.module.css";

const CreateIssueModal: React.FC = () => {
  const { isOpen, clientId } = useSnapshot(modalStore.createIssueModal);

  return (
    <Modal
      title="Create Issue"
      open={isOpen}
      onOk={() => modalStore.createIssueModal.close()}
      okText="Create Issue"
      onCancel={modalStore.createIssueModal.close}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <input type="text" value={clientId} readOnly className={styles.input} />
    </Modal>
  );
};

export { CreateIssueModal };
