"use server";

import { Issues } from "@/libs/server/models/issue";
import { connectDB } from "@/libs/server/mongo";
import { Issue } from "@/types/models/issue";
import { serializeObject } from "@/utils/object";
import { auth } from "@/../auth";
import { Clients } from "@/libs/server/models/client";

const getClientIssuesServerAction = async (): Promise<Issue[]> => {
  await connectDB();

  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const client = await Clients.findOne({
    email: session.user.email,
  });

  if (!client) {
    throw new Error("Client not found");
  }

  const issues = await Issues.find({
    clientId: client._id,
  }).sort({ createdAt: -1 });

  return serializeObject(issues);
};

export { getClientIssuesServerAction };
