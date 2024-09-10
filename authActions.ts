import "server-only";

import { Clients } from "@/libs/server/models/client";
import { Users } from "@/libs/server/models/user";

import { unstable_cache } from "next/cache";
import { connectDB } from "@/libs/server/mongo";

const getClient = async ({ email }: { email: string }) => {
  return await unstable_cache(
    async () => {
      await connectDB();

      return await Clients.findOne({ email });
    },
    ["getUser", email],
    { tags: ["getClient", email], revalidate: 60 }
  )();
};

const getUser = async ({ username }: { username: string }) => {
  return await unstable_cache(
    async () => {
      await connectDB();

      return await Users.findOne({ username });
    },
    ["getUser", username],
    { tags: ["getUser", username], revalidate: 60 }
  )();
};

export { getClient, getUser };
