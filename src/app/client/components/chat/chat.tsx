"use client";

import styles from "./chat.module.css";
import { createMessage } from "./serverActions";

import { ChatInput } from "@/components/chatInput/chatInput";
import { MESSAGE } from "@/constants/message";
import { Issue } from "@/types/models/issue";
import { CreateMessageDTO } from "@/validations/issue";

import { useMutation } from "@tanstack/react-query";
import { ClientChatList } from "../chatList/chatList";

type ChatProps = {
  currentIssue: Issue;
};

const ClientChat: React.FC<ChatProps> = ({ currentIssue }) => {
  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: (props: CreateMessageDTO) => createMessage(props),
  });

  const onSendMessage = async ({ text }: { text: string }) => {
    await sendMessage({
      text,
      issueId: currentIssue._id,
      userId: currentIssue.userId,
      clientId: currentIssue.clientId,
      sender: MESSAGE.SENDER_TYPE_INDEX.CLIENT,
    });
  };

  return (
    <div className={styles.container}>
      <ClientChatList issueId={currentIssue._id} />

      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export { ClientChat };
