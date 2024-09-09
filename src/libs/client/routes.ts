import { CreateMessageDTO } from "@/validations/issue";

const createMessage = ({
  text,
  issueId,
  userId,
  clientId,
  sender,
}: CreateMessageDTO) =>
  fetch(`${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/api/chat`, {
    method: "POST",
    body: JSON.stringify({
      text,
      issueId,
      userId,
      clientId,
      sender,
    }),
  });

export { createMessage };
