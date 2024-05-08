import { modalStore } from "@/libs/client";
import { Modal } from "antd";
import { useSnapshot } from "valtio";
import styles from "./issueLink.module.css";

const IssueLinkModal: React.FC = () => {
  const { isOpen, issueLink } = useSnapshot(modalStore.issueLinkModal);

  return (
    <Modal
      title="Issue Link"
      open={isOpen}
      onOk={() => modalStore.issueLinkModal.close()}
      onCancel={modalStore.issueLinkModal.close}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <input type="text" value={issueLink} readOnly className={styles.input} />
    </Modal>
  );
};

export { IssueLinkModal };
