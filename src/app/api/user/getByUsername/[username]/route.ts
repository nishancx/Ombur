import { Users } from "@/libs/server/models/user";
import { connectDB } from "@/libs/server/mongo";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (token !== process.env.MONGO_REST_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await Users.findOne({ username });

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
