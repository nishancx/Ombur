"use client";

import styles from "./chat.module.css";
import { createMessage } from "./serverActions";

import { ClientChatList } from "@/components/chatList/chatList";
import { ChatInput } from "@/components/chatInput/chatInput";
import { MESSAGE } from "@/constants/message";
import { Issue } from "@/types/models/issue";
import { CreateMessageDTO } from "@/validations/issue";

import { useMutation } from "@tanstack/react-query";

type ChatProps = {
  currentIssue: Issue;
};

const UserChat: React.FC<ChatProps> = ({ currentIssue }) => {
  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: (props: CreateMessageDTO) => createMessage(props),
  });

  const onSendMessage = async ({ text }: { text: string }) => {
    await sendMessage({
      text,
      issueId: currentIssue._id,
      userId: currentIssue.userId,
      clientId: currentIssue.clientId,
      sender: MESSAGE.SENDER_TYPE_INDEX.USER,
    });
  };

  return (
    <div className={styles.container}>
      <ClientChatList
        issueId={currentIssue._id}
        sender={MESSAGE.SENDER_TYPE_INDEX.USER}
      />

      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export { UserChat };
