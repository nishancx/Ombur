"use server";

import { Users, connectDB } from "@/libs/server";
import { UserDTO, userValidationSchema } from "@/validations";

const createUserServerAction = async ({ name }: UserDTO) => {
  await connectDB();

  const isPayloadValid = userValidationSchema.safeParse({ name });

  if (!isPayloadValid.success) {
    throw new Error("Invalid form data.");
  }

  const user = await Users.create({ name });

  return user._id.toString();
};

export { createUserServerAction };
