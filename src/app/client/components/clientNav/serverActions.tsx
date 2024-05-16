"use server";

import { connectDB } from "@/libs/server/mongo";
import { Clients } from "@/libs/server/models/client";
import { auth } from "@/../auth";
import { serializeObject } from "@/utils/object";

const getSessionClientServerAction = async () => {
  await connectDB();

  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const client = await Clients.findOne({ email: session.user.email });

  if (!client) {
    return null;
  }

  return serializeObject(client);
};

export { getSessionClientServerAction };
