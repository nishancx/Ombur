"use client";

import styles from "./chatList.module.css";
import { fetchChat } from "./serverActions";

import { GlobalPageParams } from "@/types/query";
import { Message } from "@/types/models/message";
import { reduceInfiniteData } from "@/utils/query";

import { Loader } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

type ClientChatListProps = {
  issueId: string;
};

const ClientChatList: React.FC<ClientChatListProps> = ({ issueId }) => {
  const { data: messages, isLoading: isLoadingMessages } = useInfiniteQuery({
    queryKey: ["fetchChat", { issueId }],
    queryFn: ({ pageParam = 0 }) => fetchChat({ issueId, page: pageParam }),
    getNextPageParam: (lastPage: GlobalPageParams<Message>) => {
      if (lastPage?.data?.length) {
        return lastPage.page! + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    select(data) {
      return data;
    },
  });
  const messageList = reduceInfiniteData(messages?.pages);

  if (isLoadingMessages) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {messageList.map((message) => (
        <div key={message._id}>
          <div>{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export { ClientChatList };
