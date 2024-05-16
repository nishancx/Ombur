"use server";

import { Issues, connectDB } from "@/libs/server";
import { Issue } from "@/types";
import { serializeObject } from "@/utils";
import { IssueDTO, issueValidationSchema } from "@/validations";

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
