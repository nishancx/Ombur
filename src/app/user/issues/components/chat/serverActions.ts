"use server";

import { MESSAGE } from "@/constants/message";
import { Messages } from "@/libs/server/models/message";
import { connectDB } from "@/libs/server/mongo";
import { serializeObject } from "@/utils/object";
import {
  CreateMessageDTO,
  createMessageValidationSchema,
} from "@/validations/issue";

const createMessage = async ({
  text,
  issueId,
  userId,
  clientId,
  sender,
}: CreateMessageDTO) => {
  await connectDB();

  const isPayloadValid = createMessageValidationSchema.safeParse({
    text,
    issueId,
    userId,
    clientId,
    sender,
  });

  if (!isPayloadValid.success) {
    throw new Error("Invalid form data.");
  }

  const newMessage = await Messages.create({
    sender: MESSAGE.SENDER_TYPE_INDEX.USER,
    issueId,
    userId,
    clientId,
    text,
  });

  return serializeObject(newMessage);
};

export { createMessage };
