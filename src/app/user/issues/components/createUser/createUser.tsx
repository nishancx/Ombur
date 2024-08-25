"use client";

import styles from "./createUser.module.css";

import { Button } from "@/components/button/button";
import { UserDTO, userValidationSchema } from "@/validations/user";
import { invokeOnEnterPress } from "@/utils/dom";

import { Controller, useForm } from "react-hook-form";
import { Input } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

const CreateUser: React.FC = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<UserDTO>({
    mode: "onSubmit",
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      username: crypto.randomUUID(),
    },
  });

  const createUser = async (data: UserDTO) => {
    await signIn("credentials", data);
    // const user = await createUserServerAction(data);

    // saveItemToLocalStorage({
    //   key: LOCAL_STORAGE.OMBUR_USER_ID,
    //   value: user._id,
    // });

    // queryClient.setQueryData(QUERY.QUERY_KEYS.GET_SESSION_USER, user);
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
