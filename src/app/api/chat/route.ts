export const dynamic = "force-dynamic";
export const runtime = "edge";

import { Client } from "@/types/models/client";
import { User } from "@/types/models/user";

import { cookies } from "next/dist/client/components/headers";
import { decode } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

var sseIdMap: Map<string, WritableStreamDefaultWriter<any>> = new Map();

export async function GET(req: Request) {
  try {
    const session = await getSession();

    const senderEmail = session?.email;

    if (!senderEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sender = await fetchSenderByEmail({ email: senderEmail });
    const senderId = sender?._id;

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
  // const body = await request.json();
  // const { text, issueId, userId, clientId, sender } = body;

  // const isPayloadValid = createMessageValidationSchema.safeParse({
  //   text,
  //   issueId,
  //   userId,
  //   clientId,
  //   sender,
  // });

  // if (!isPayloadValid.success) {
  //   return NextResponse.json({ error: isPayloadValid.error }, { status: 400 });
  // }

  // await connectDB();

  // const session = await auth();

  // if (!session || !session?.user) {
  //   throw new Error("Unauthorized");
  // }

  // if (sender === MESSAGE.SENDER_TYPE_INDEX.CLIENT) {
  //   const client = await Clients.findOne({
  //     _id: session.user.id,
  //   });

  //   if (!client) {
  //     throw new Error("Client not found");
  //   }
  // }

  // if (sender === MESSAGE.SENDER_TYPE_INDEX.USER) {
  //   const user = await Users.findOne({
  //     _id: session.user.id,
  //   });

  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  // }

  // const newMessage = await Messages.create({
  //   sender,
  //   issueId,
  //   userId,
  //   clientId,
  //   text,
  // });

  // const receiverId =
  //   sender === MESSAGE.SENDER_TYPE_INDEX.CLIENT ? userId : clientId;

  // const receiverWriter = sseIdMap.get(receiverId);

  // if (receiverWriter) {
  //   const encoder = new TextEncoder();

  //   receiverWriter.write(
  //     encoder.encode(`data: ${JSON.stringify(newMessage)}\n\n`)
  //   );
  // }

  // return NextResponse.json(newMessage, { status: 200 });
  return NextResponse.json({}, { status: 200 });
}

const getSession = async () => {
  let sessionToken: RequestCookie | undefined = {
    name: "",
    value: "",
  };
  if (process.env.ENVIRONMENT === "development") {
    // served over HTTP
    sessionToken = cookies().get("authjs.session-token");
  }
  if (process.env.ENVIRONMENT === "production") {
    // served over HTTPS
    sessionToken = cookies().get("__Secure-authjs.session-token");
  }
  return await decode({
    token: sessionToken?.value,
    secret: process.env.AUTH_SECRET || "",
    salt: sessionToken?.name || "",
  });
};

const fetchSenderByEmail = async ({
  email,
}: {
  email: string;
}): Promise<Client | User | null> => {
  if (email.includes("@")) {
    return fetchClientByEmail({ email });
  }

  if (email.includes("-")) {
    return fetchUserByUsername({ username: email });
  }

  return null;
};

const fetchClientByEmail = async ({
  email,
}: {
  email: string;
}): Promise<Client | null> => {
  const senderResponseRaw = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/api/client/getByEmail/${email}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MONGO_REST_TOKEN}`,
      },
    }
  );
  const senderResponse = await senderResponseRaw.json();

  return senderResponse.data || null;
};

const fetchClientById = async ({
  id,
}: {
  id: string;
}): Promise<Client | null> => {
  const senderResponseRaw = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/api/client/getById/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MONGO_REST_TOKEN}`,
      },
    }
  );
  const senderResponse = await senderResponseRaw.json();

  return senderResponse.data || null;
};

const fetchUserByUsername = async ({
  username,
}: {
  username: string;
}): Promise<User | null> => {
  const userResponseRaw = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/api/user/getByUsername/${username}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MONGO_REST_TOKEN}`,
      },
    }
  );
  const senderResponse = await userResponseRaw.json();

  return senderResponse.data || null;
};

const fetchUserById = async ({ id }: { id: string }): Promise<User | null> => {
  const senderResponseRaw = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/api/user/getById/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MONGO_REST_TOKEN}`,
      },
    }
  );
  const senderResponse = await senderResponseRaw.json();

  return senderResponse.data || null;
};
