"use client";

import styles from "./issueInfo.module.css";
import { updateResolved } from "./serverActions";

import { modalStore } from "@/libs/client/stores/modal";
import { AUTH } from "@/constants/auth";
import { IssueWithUser } from "@/types/models/issue";

import clsx from "clsx";
import { Checkbox, Modal } from "antd";
import { useSnapshot } from "valtio";
import { useMutation } from "@tanstack/react-query";

const IssueInfoModal: React.FC = () => {
  const { isOpen, issue, sessionType } = useSnapshot(modalStore.issueInfoModal);

  const { mutateAsync: updateResolvedMutation, isPending: updatingResolved } =
    useMutation({
      mutationFn: updateResolved,
      onMutate: async (props) => {
        const previousIssue = issue;
        modalStore.issueInfoModal.open({
          sessionType,
          issue: {
            ...issue,
            resolved: props.resolved,
          } as IssueWithUser,
        });

        return previousIssue;
      },
    });

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

        <div className={styles.resolvedContainer}>
          <div>Resolved</div>
          <Checkbox
            checked={issue?.resolved}
            disabled={updatingResolved}
            onChange={(e) =>
              updateResolvedMutation({
                issueId: issue?._id || "",
                resolved: e.target.checked,
              })
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export { IssueInfoModal };
