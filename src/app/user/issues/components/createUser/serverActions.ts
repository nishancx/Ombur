"use server";

import { Users } from "@/libs/server/models/user";
import { connectDB } from "@/libs/server/mongo";
import { User } from "@/types/models/user";
import { serializeObject } from "@/utils/object";
import { UserDTO, userValidationSchema } from "@/validations/user";

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
