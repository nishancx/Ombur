import { CreateMessageDTO } from "@/validations/issue";

const createMessage = ({
  text,
  issueId,
  userId,
  clientId,
  sender,
}: CreateMessageDTO) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVICES_WEB_DOMAIN_URL}/send-message`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      asdf:'asdf',
      text,
      issueId,
      userId,
      clientId,
      sender,
    }),
  });

export { createMessage };
