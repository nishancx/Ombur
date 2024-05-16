"use server";

import { Issues } from "@/libs/server/models/issue";
import { connectDB } from "@/libs/server/mongo";
import { Issue } from "@/types/models/issue";
import { serializeObject } from "@/utils/object";
import { IssueDTO, issueValidationSchema } from "@/validations/issue";

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

export { createIssueServerAction };
