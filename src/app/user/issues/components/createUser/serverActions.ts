"use server";

import { Users, connectDB } from "@/libs/server";
import { User } from "@/types";
import { serializeObject } from "@/utils";
import { UserDTO, userValidationSchema } from "@/validations";

const createUserServerAction = async ({ name }: UserDTO): Promise<User> => {
  await connectDB();

  const isPayloadValid = userValidationSchema.safeParse({ name });

  if (!isPayloadValid.success) {
    throw new Error("Invalid form data.");
  }

  const user = await Users.create({ name });

  return serializeObject(user);
};

export { createUserServerAction };
