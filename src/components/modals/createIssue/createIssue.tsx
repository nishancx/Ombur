import { modalStore, userIdStore } from "@/libs/client";
import { Input, Modal, Select } from "antd";
import { useSnapshot } from "valtio";
import styles from "./createIssue.module.css";
import { Controller, useForm } from "react-hook-form";
import { IssueDTO, issueValidationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ISSUE } from "@/constants/issue";
import { createIssueAction } from "./serverActions";

const CreateIssueModal: React.FC = () => {
  const { isOpen, clientId } = useSnapshot(modalStore.createIssueModal);
  const { userId } = useSnapshot(userIdStore);
  const { control, handleSubmit, setValue } = useForm<IssueDTO>({
    mode: "onSubmit",
    resolver: zodResolver(issueValidationSchema),
    defaultValues: { clientId, type: ISSUE.TYPES_LIST[0] },
  });

  const onSubmit = async (data: IssueDTO) => {
    const issue = await createIssueAction(data);
    console.log("issue", issue);
    modalStore.createIssueModal.close();
  };

  useEffect(() => {
    if (userId) {
      setValue("userId", userId);
    }

    if (clientId) {
      setValue("clientId", clientId);
    }
  }, [setValue, userId, clientId]);

  return (
    <Modal
      title="Create Issue"
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      okText="Create Issue"
      onCancel={modalStore.createIssueModal.close}
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
            {/* <Input.TextArea {...field} className={styles.input} /> */}
            <Select
              {...field}
              value={ISSUE.TYPES_LIST[0]}
              className={styles.select}
            >
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
