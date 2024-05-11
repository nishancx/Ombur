"use server";

import { Client, Clients, connectDB } from "@/libs/server";
import { serializeObject } from "@/utils";
import { auth } from "@/../auth";

const getClientProfileInfo = async ({
  clientId,
}: {
  clientId: string;
}): Promise<Client | null> => {
  await connectDB();

  const user = await Clients.findById(clientId).select("name avatar");

  if (!user) {
    return null;
  }

  return serializeObject(user);
};

export { getClientProfileInfo };
