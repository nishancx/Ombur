import { createMessageValidationSchema } from "@/validations/issue";
import { auth } from "@/../auth";
import { MESSAGE } from "@/constants/message";
import { Clients } from "@/libs/server/models/client";
import { Users } from "@/libs/server/models/user";
import { Messages } from "@/libs/server/models/message";

import { NextResponse } from "next/server";

var sseIdMap: Map<string, WritableStreamDefaultWriter<any>> = new Map();

export async function GET(req: Request) {
  try {
    const session = await auth();

    const senderId = session?.user?.id;

    if (!senderId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();

    req.signal.onabort = () => {
      writer.close();
    };

    sseIdMap.set(senderId, writer);

    return new Response(responseStream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { text, issueId, userId, clientId, sender } = body;
  const isPayloadValid = createMessageValidationSchema.safeParse({
    text,
    issueId,
    userId,
    clientId,
    sender,
  });

  if (!isPayloadValid.success) {
    return NextResponse.json({ error: isPayloadValid.error }, { status: 400 });
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

  const receiverId =
    sender === MESSAGE.SENDER_TYPE_INDEX.CLIENT ? userId : clientId;

  const receiverWriter = sseIdMap.get(receiverId);

  if (receiverWriter) {
    const encoder = new TextEncoder();

    receiverWriter.write(
      encoder.encode(`data: ${JSON.stringify(newMessage)}\n\n`)
    );
  }

  return NextResponse.json(newMessage, { status: 500 });
}
