"use server";

import { Users, connectDB } from "@/libs/server";
import { UserDTO } from "@/validations";

const createUserAction = async ({ name }: UserDTO) => {
  await connectDB();

  const user = await Users.create({ name });

  return user._id.toString();
};

export { createUserAction };
