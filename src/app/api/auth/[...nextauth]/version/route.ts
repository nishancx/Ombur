import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const version = process.env.VERCEL_GIT_COMMIT_SHA || 'local';

    return NextResponse.json({ version }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
