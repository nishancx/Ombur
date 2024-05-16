"use server";

import { Clients, Issues, connectDB } from "@/libs/server";
import { Client, Issue } from "@/types";
import { serializeObject } from "@/utils";

const getClientProfileInfoServerAction = async ({
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

const getIssuesServerAction = async ({
  clientId,
  userId,
}: {
  clientId: string;
  userId: string;
}): Promise<Issue[]> => {
  await connectDB();

  const issues = await Issues.find({
    clientId,
    userId,
  });

  return serializeObject(issues);
};

export { getClientProfileInfoServerAction, getIssuesServerAction };
