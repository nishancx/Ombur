"use server";

import { connectDB } from "@/libs/server/mongo";
import { Clients } from "@/libs/server/models/client";
import { auth } from "@/../auth";
import { serializeObject } from "@/utils/object";
import { Issues } from "@/libs/server/models/issue";
import { IssueWithUser } from "@/types/models/issue";

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

const getClientIssuesServerAction = async () => {
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

  const issues: IssueWithUser[] = await Issues.aggregate([
    {
      $addFields: {
        userObjectId: {
          $convert: { input: "$userId", to: "objectId", onError: "" },
        },
      },
    },
    {
      $match: {
        clientId: client._id.toString(),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userObjectId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        type: 1,
        "user.name": 1,
        createdAt: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return serializeObject(issues);
};

export { getSessionClientServerAction, getClientIssuesServerAction };
