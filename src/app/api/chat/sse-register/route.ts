import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    writer.write(encoder.encode("hello world!"));

    setInterval(() => {
      writer.write(
        encoder.encode("data: " + new Date().toISOString() + "\n\n")
      );
    }, 1000);

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
