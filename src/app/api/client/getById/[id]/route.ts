import { Clients } from "@/libs/server/models/client";
import { connectDB } from "@/libs/server/mongo";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (token !== process.env.MONGO_REST_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    await connectDB();

    const client = await Clients.findById(id);

    return NextResponse.json({ data: client }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
