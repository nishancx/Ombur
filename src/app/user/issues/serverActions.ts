"use server";

import { Users } from "@/libs/server/models/user";
import { connectDB } from "@/libs/server/mongo";
import { User } from "@/types/models/user";
import { serializeObject } from "@/utils/object";
import { UserDTO, userValidationSchema } from "@/validations/user";
import { Clients } from "@/libs/server/models/client";
import { Issues } from "@/libs/server/models/issue";
import { Client } from "@/types/models/client";
import { Issue } from "@/types/models/issue";
import { IssueDTO, issueValidationSchema } from "@/validations/issue";

const getUserServerAction = async ({
  userId,
}: {
  userId: string;
}): Promise<User | null> => {
  await connectDB();

  const user = await Users.findById(userId);

  return serializeObject(user);
};

const createUserServerAction = async ({
  name,
  username,
}: UserDTO): Promise<User> => {
  await connectDB();

  const isPayloadValid = userValidationSchema.safeParse({ name, username });

  if (!isPayloadValid.success) {
    throw new Error("Invalid form data.");
  }

  const user = await Users.create({ name, username });

  return serializeObject(user);
};

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

const getUsersIssuesServerAction = async ({
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

const createIssueServerAction = async ({
  title,
  description,
  type,
  clientId,
  userId,
}: IssueDTO): Promise<Issue> => {
  await connectDB();

  const isPayloadValid = issueValidationSchema.safeParse({
    title,
    description,
    type,
    clientId,
    userId,
  });

  if (!isPayloadValid.success) {
    throw new Error("Invalid form data.");
  }

  const issue = await Issues.create({
    title,
    description,
    type,
    clientId,
    userId,
  });

  return serializeObject(issue);
};

export {
  getUserServerAction,
  createUserServerAction,
  getClientProfileInfoServerAction,
  getUsersIssuesServerAction,
  createIssueServerAction,
};
