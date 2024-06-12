"use client";

import styles from "./issueInfo.module.css";

import { modalStore } from "@/libs/client/stores/modal";
import { AUTH } from "@/constants/auth";

import { Modal } from "antd";
import { useSnapshot } from "valtio";
import clsx from "clsx";

const IssueInfoModal: React.FC = () => {
  const { isOpen, issue, sessionType } = useSnapshot(modalStore.issueInfoModal);

  const closeModal = () => {
    modalStore.issueInfoModal.close();
  };

  return (
    <Modal
      title="Issue info"
      open={isOpen}
      onOk={closeModal}
      okText="Close"
      onCancel={closeModal}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div>
        {sessionType === AUTH.SESSION_TYPES.CLIENT && !!issue?.user?.name && (
          <div>
            <div>User</div>
            <div className={styles.textBox}>{issue.user.name}</div>
          </div>
        )}

        <div>Title</div>
        <div className={styles.textBox}>{issue?.title}</div>

        <div>Description</div>
        <div className={styles.textBox}>{issue?.description}</div>

        <div>Type</div>
        <div className={clsx(styles.textBox, styles.issueType)}>
          {issue?.type}
        </div>
      </div>
    </Modal>
  );
};

export { IssueInfoModal };
