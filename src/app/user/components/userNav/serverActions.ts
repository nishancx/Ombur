"use server";

import { Users, connectDB } from "@/libs/server";
import { User } from "@/types";
import { serializeObject } from "@/utils";

const getUserServerAction = async ({
  userId,
}: {
  userId: string;
}): Promise<User> => {
  await connectDB();

  const user = await Users.findById(userId);

  return serializeObject(user);
};

export { getUserServerAction };
