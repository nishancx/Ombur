"use server";

import { Users } from "@/libs/server/models/user";
import { connectDB } from "@/libs/server/mongo";
import { User } from "@/types/models/user";
import { serializeObject } from "@/utils/object";

const getUserServerAction = async ({
  userId,
}: {
  userId: string;
}): Promise<User | null> => {
  await connectDB();

  const user = await Users.findById(userId);

  return serializeObject(user);
};

export { getUserServerAction };
