"use server";

import { MESSAGE } from "@/constants/message";
import { Messages } from "@/libs/server/models/message";
import { connectDB } from "@/libs/server/mongo";
import { serializeObject } from "@/utils/object";
import {
  CreateMessageDTO,
  createMessageValidationSchema,
} from "@/validations/issue";
import { auth } from "../../../../../auth";
import { Clients } from "@/libs/server/models/client";

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

  if (sender === MESSAGE.SENDER_TYPE_INDEX.CLIENT) {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const client = await Clients.findOne({
      email: session.user.email,
    });

    if (!client || client._id.toString() !== clientId) {
      throw new Error("Client not found");
    }
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
