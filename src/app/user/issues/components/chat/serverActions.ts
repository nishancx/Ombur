"use server";

import { MESSAGE } from "@/constants/message";
import { Messages } from "@/libs/server/models/message";
import { connectDB } from "@/libs/server/mongo";
import { serializeObject } from "@/utils/object";
import { CreateMessageDTO } from "@/validations/issue";

const createMessage = async ({
  message,
  issueId,
  userId,
  clientId,
  sender,
}: CreateMessageDTO) => {
  await connectDB();

  const newMessage = await Messages.create({
    sender: MESSAGE.SENDER_TYPE_INDEX.USER,
    issueId,
    userId,
    clientId,
    message,
  });

  return serializeObject(newMessage);
};

export { createMessage };
