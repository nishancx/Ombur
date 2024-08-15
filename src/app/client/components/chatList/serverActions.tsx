"use server";

import { Issues } from "@/libs/server/models/issue";
import { Messages } from "@/libs/server/models/message";
import { connectDB } from "@/libs/server/mongo";
import { serializeObject } from "@/utils/object";

const fetchChat = async ({
  issueId,
  page = 0,
}: {
  issueId: string;
  page?: number;
}) => {
  await connectDB();

  const issue = await Issues.findById(issueId);

  if (!issue) {
    throw new Error("Issue not found");
  }

  const messages = await Messages.find({
    issueId,
  })
    .sort({ createdAt: -1 })
    .skip(page * 10)
    .limit(50);

  return serializeObject({
    data: messages,
    page,
  });
};

export { fetchChat };
