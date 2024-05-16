"use client";

import styles from "./createUser.module.css";
import { Controller, useForm } from "react-hook-form";
import { Input } from "antd";
import { Button } from "@/components/button/button";
import { UserDTO, userValidationSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserServerAction } from "./serverActions";
import { saveItemToLocalStorage } from "@/libs/client/storage";
import { LOCAL_STORAGE } from "@/constants/localStorage";
import { invokeOnEnterPress } from "@/utils/dom";
import { useQueryClient } from "@tanstack/react-query";

const CreateUser: React.FC = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<UserDTO>({
    mode: "onSubmit",
    resolver: zodResolver(userValidationSchema),
  });

  const createUser = async (data: UserDTO) => {
    const user = await createUserServerAction(data);

    saveItemToLocalStorage({
      key: LOCAL_STORAGE.OMBUR_USER_ID,
      value: user._id,
    });

    queryClient.setQueryData(["getUser"], user);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>Please enter your name:</div>

        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              status={!!error ? "error" : ""}
              className={styles.nameInput}
              onKeyDown={(event) =>
                invokeOnEnterPress({ event, action: handleSubmit(createUser) })
              }
            />
          )}
        />

        <Button
          onClick={handleSubmit(createUser)}
          className={styles.submitButton}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export { CreateUser };
