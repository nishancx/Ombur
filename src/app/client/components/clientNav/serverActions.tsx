"use server";

import { Clients, connectDB } from "@/libs/server";
import { auth } from "@/../auth";
import { serializeObject } from "@/utils";

const getSessionClient = async () => {
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

export { getSessionClient };
