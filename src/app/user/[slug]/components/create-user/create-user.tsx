import { Controller, useForm } from "react-hook-form";
import { Input } from "antd";
import { Button } from "@/components";
import { UserDTO, userValidationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserAction } from "./serverActions";
import { saveItemToLocalStorage } from "@/libs/client";
import { LOCAL_STORAGE } from "@/constants";
import styles from "./create-user.module.css";

type CreateUserProps = {
  setSavedUserId: (userId: string) => void;
  clientEmail: string;
};

const CreateUser: React.FC<CreateUserProps> = ({
  setSavedUserId,
  clientEmail,
}) => {
  const { control, handleSubmit } = useForm<UserDTO>({
    mode: "onSubmit",
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      clientEmail: clientEmail,
    },
  });

  const createUser = async (data: UserDTO) => {
    const userId = await createUserAction(data);

    saveItemToLocalStorage({ key: LOCAL_STORAGE.OMBUR_USER_ID, value: userId });
    setSavedUserId(userId);
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
