import { createMessageValidationSchema } from "@/validations/issue";
import { Messages } from "@/libs/server/models/message";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
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

  const token = req.headers.get("authorization")?.split(" ")[1];

  if (token !== process.env.MONGO_REST_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const newMessage = await Messages.create({
    sender,
    issueId,
    userId,
    clientId,
    text,
  });

  return NextResponse.json({ data: newMessage }, { status: 200 });
}
