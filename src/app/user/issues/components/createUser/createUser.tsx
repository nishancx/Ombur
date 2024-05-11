import styles from "./createUser.module.css";
import { Controller, useForm } from "react-hook-form";
import { Input } from "antd";
import { Button } from "@/components";
import { UserDTO, userValidationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserServerAction } from "./serverActions";
import { saveItemToLocalStorage, userIdStore } from "@/libs/client";
import { LOCAL_STORAGE } from "@/constants";

const CreateUser: React.FC = () => {
  const { control, handleSubmit } = useForm<UserDTO>({
    mode: "onSubmit",
    resolver: zodResolver(userValidationSchema),
  });

  const createUser = async (data: UserDTO) => {
    const userId = await createUserServerAction(data);

    saveItemToLocalStorage({ key: LOCAL_STORAGE.OMBUR_USER_ID, value: userId });
    userIdStore.setUserId({ userId });
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
