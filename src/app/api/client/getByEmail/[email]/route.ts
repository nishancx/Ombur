import { Clients } from "@/libs/server/models/client";
import { connectDB } from "@/libs/server/mongo";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (token !== process.env.MONGO_REST_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { email } = params;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const client = await Clients.findOne({ email });

    return NextResponse.json({ data: client }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
