"use server";

import { Message } from "@/types/models/message";

const sendSse = async ({
  responseStream,
  message,
}: {
  responseStream: TransformStream<any, any>;
  message: Message;
}) => {
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();
  await writer.write(
    encoder.encode(`data: ${Date.now()}\n\n`)
    // encoder.encode(`data: ${JSON.stringify(newMessage)}\n\n`)
  );
};

export { sendSse };
