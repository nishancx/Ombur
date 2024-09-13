import { CreateMessageDTO } from "@/validations/issue";

const createMessage = ({
  payload: { text, issueId, userId, clientId, sender },
  authToken,
}: {
  payload: CreateMessageDTO;
  authToken: string;
}) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVICES_WEB_DOMAIN_URL}/send-message`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      asdf: "asdf",
      text,
      issueId,
      userId,
      clientId,
      sender,
    }),
  });

export { createMessage };
