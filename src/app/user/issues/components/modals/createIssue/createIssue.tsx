"use client";

import styles from "./createIssue.module.css";
import { createIssueServerAction } from "../../../serverActions";

import { issueStore } from "@/libs/client/stores/issue";
import { modalStore } from "@/libs/client/stores/modal";
import { IssueDTO, issueValidationSchema } from "@/validations/issue";
import { ISSUE } from "@/constants/issue";
import { QUERY } from "@/constants/query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Modal, Select } from "antd";
import { useSnapshot } from "valtio";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

const CreateIssueModal: React.FC = () => {
  const { isOpen, clientId } = useSnapshot(modalStore.createIssueModal);
  const session = useSession();
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
      queryKey: QUERY.QUERY_KEYS.GET_USER_ISSUES({
        clientId,
        userId: session?.data?.user?.id || "",
      }),
    });

    issueStore.usersCurrentIssue.setCurrentIssue({ currentIssue: issue });
    closeModal();
  };

  useEffect(() => {
    if (session?.data?.user && session?.data?.user?.id) {
      setValue("userId", session?.data?.user?.id);
    }

    if (clientId) {
      setValue("clientId", clientId);
    }
  }, [setValue, clientId, session?.data?.user]);

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
