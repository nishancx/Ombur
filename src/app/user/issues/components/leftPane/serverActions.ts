"use server";

import { Clients } from "@/libs/server/models/client";
import { Issues } from "@/libs/server/models/issue";
import { connectDB } from "@/libs/server/mongo";
import { Client } from "@/types/models/client";
import { Issue } from "@/types/models/issue";
import { serializeObject } from "@/utils/object";

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
  }).sort({ createdAt: -1 });

  return serializeObject(issues);
};

export { getClientProfileInfoServerAction, getIssuesServerAction };
