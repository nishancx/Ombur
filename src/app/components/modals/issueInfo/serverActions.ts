"use server";

import { connectDB } from "@/libs/server/mongo";
import { auth } from "@/../auth";
import { Issues } from "@/libs/server/models/issue";
import { serializeObject } from "@/utils/object";

const updateResolved = async ({
  issueId,
  resolved,
}: {
  issueId: string;
  resolved: boolean;
}) => {
  await connectDB();

  const session = await auth();

  if (!session || !session?.user) {
    throw new Error("Unauthorized");
  }

  const issue = await Issues.findOneAndUpdate(
    {
      _id: issueId,
      $or: [{ clientId: session.user.id }, { userId: session.user.id }],
    },
    { resolved },
    { new: true }
  );

  return serializeObject(issue);
};

export { updateResolved };
