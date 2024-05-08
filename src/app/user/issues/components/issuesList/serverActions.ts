"use server";

import { Clients, connectDB } from "@/libs/server";
import { serializeObject } from "@/utils";

const getClientProfileInfo = async ({ clientId }: { clientId: string }) => {
  await connectDB();

  const user = await Clients.findById(clientId).select("name avatar");

  return serializeObject(user);
};

export { getClientProfileInfo };
