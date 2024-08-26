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
import { Users } from "@/libs/server/models/user";

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

  const session = await auth();

  if (!session || !session?.user) {
    throw new Error("Unauthorized");
  }

  if (sender === MESSAGE.SENDER_TYPE_INDEX.CLIENT) {
    const client = await Clients.findOne({
      _id: session.user.id,
    });

    if (!client) {
      throw new Error("Client not found");
    }
  }

  if (sender === MESSAGE.SENDER_TYPE_INDEX.USER) {
    const user = await Users.findOne({
      _id: session.user.id,
    });

    if (!user) {
      throw new Error("User not found");
    }
  }

  const newMessage = await Messages.create({
    sender: MESSAGE.SENDER_TYPE_INDEX.CLIENT,
    issueId,
    userId,
    clientId,
    text,
  });

  return serializeObject(newMessage);
};

export { createMessage };
