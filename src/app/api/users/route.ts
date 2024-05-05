import { Users } from "@/libs/server/models/user";
import { connectDB } from "@/libs/server/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await Users.find();

    const version = JSON.stringify(users);
    // const version = process.env.VERCEL_GIT_COMMIT_SHA || 'local';

    return NextResponse.json({ version }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
