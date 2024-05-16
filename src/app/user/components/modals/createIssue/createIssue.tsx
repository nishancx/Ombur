"use client";

import styles from "./createIssue.module.css";
import { issueStore } from "@/libs/client/stores/issueStore";
import { modalStore } from "@/libs/client/stores/modalStore";
import { Input, Modal, Select } from "antd";
import { useSnapshot } from "valtio";
import { Controller, useForm } from "react-hook-form";
import { IssueDTO, issueValidationSchema } from "@/validations/issue";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ISSUE } from "@/constants/issue";
import { createIssueServerAction } from "./serverActions";
import { useUser } from "@/queries/user";
import { useQueryClient } from "@tanstack/react-query";

const CreateIssueModal: React.FC = () => {
  const { isOpen, clientId } = useSnapshot(modalStore.createIssueModal);
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const { control, reset, handleSubmit, setValue } = useForm<IssueDTO>({
    mode: "onSubmit",
    resolver: zodResolver(issueValidationSchema),
    defaultValues: { clientId, type: ISSUE.TYPES_LIST[0] },
  });

  const closeModal = () => {
    reset();
    modalStore.createIssueModal.close();
  };

  const onSubmit = async (data: IssueDTO) => {
    const issue = await createIssueServerAction(data);

    // to fix, use optimistic updates
    queryClient.invalidateQueries({
      queryKey: ["getIssues", clientId, user!._id],
    });

    issueStore.usersCurrentIssue.setCurrentIssue({ currentIssue: issue });
    closeModal();
  };

  useEffect(() => {
    if (user) {
      setValue("userId", user._id);
    }

    if (clientId) {
      setValue("clientId", clientId);
    }
  }, [setValue, user, clientId]);

  return (
    <Modal
      title="Create Issue"
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      okText="Create Issue"
      onCancel={closeModal}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className={styles.label}>Title</div>
            <Input
              {...field}
              className={styles.input}
              status={!!error ? "error" : ""}
            />
          </>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className={styles.label}>Description</div>
            <Input.TextArea
              {...field}
              autoSize={{ minRows: 3 }}
              className={styles.input}
              status={!!error ? "error" : ""}
            />
          </>
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <>
            <div className={styles.label}>Type</div>
            <Select {...field} className={styles.select}>
              {ISSUE.TYPES_LIST.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </>
        )}
      />
    </Modal>
  );
};

export { CreateIssueModal };
