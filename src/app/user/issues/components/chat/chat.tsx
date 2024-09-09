"use client";

import styles from "./chat.module.css";

import { ChatList } from "@/components/chatList/chatList";
import { ChatInput } from "@/components/chatInput/chatInput";
import { MESSAGE } from "@/constants/message";
import { Issue } from "@/types/models/issue";
import { CreateMessageDTO } from "@/validations/issue";
import { Message } from "@/types/models/message";
import { QUERY } from "@/constants/query";
import { createMessage } from "@/libs/client/routes";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type ChatProps = {
  currentIssue: Issue;
};

const UserChat: React.FC<ChatProps> = ({ currentIssue }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: (props: CreateMessageDTO) => createMessage(props),
    onMutate: async (props) => {
      const previousMessages:
        | InfiniteData<
            {
              data: Message[];
              page: number;
            },
            number
          >
        | undefined = queryClient.getQueryData(
        QUERY.QUERY_KEYS.GET_USER_CHAT({ issueId: currentIssue._id })
      );
      queryClient.setQueryData(
        QUERY.QUERY_KEYS.GET_USER_CHAT({ issueId: currentIssue._id }),
        {
          pages: [
            {
              data: [
                {
                  ...props,
                  _id: Math.random().toString(36).substring(2, 9),
                  createdAt: new Date().toISOString(),
                },
                ...(previousMessages?.pages?.[0]?.data || []),
              ],
              page: 0,
            },
            ...(previousMessages?.pages ? previousMessages.pages.slice(1) : []),
          ],
          pageParams: previousMessages?.pageParams,
        }
      );
    },
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
      <ChatList
        issueId={currentIssue._id}
        sender={MESSAGE.SENDER_TYPE_INDEX.USER}
      />

      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export { UserChat };
