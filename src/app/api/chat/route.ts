import { createMessageValidationSchema } from "@/validations/issue";
import { MESSAGE } from "@/constants/message";
import { auth } from "@/../auth";
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
      sseIdMap.delete(senderId);
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
  const email = session?.user?.email;

  if (!session || !email) {
    throw new Error("Unauthorized");
  }

  if (sender === MESSAGE.SENDER_TYPE_INDEX.CLIENT) {
    const client = await Clients.findOne({ email });

    if (!client) {
      throw new Error("Client not found");
    }
  }

  if (sender === MESSAGE.SENDER_TYPE_INDEX.USER) {
    const user = await Users.findOne({ username: email });

    if (!user) {
      throw new Error("User not found");
    }
  }

  const newMessage = await Messages.create({
    sender,
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

    await receiverWriter.write(
      encoder.encode(`data: ${JSON.stringify(newMessage)}\n\n`)
    );
  }

  return NextResponse.json({ data: null }, { status: 200 });
}
