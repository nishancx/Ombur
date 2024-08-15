"use client";

import styles from "./chatList.module.css";
import { fetchChat } from "./serverActions";

import { GlobalPageParams } from "@/types/query";
import { Message } from "@/types/models/message";
import { reduceInfiniteData } from "@/utils/query";

import { Loader } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { MESSAGE } from "@/constants/message";
import clsx from "clsx";

type ClientChatListProps = {
  issueId: string;
};

const ClientChatList: React.FC<ClientChatListProps> = ({ issueId }) => {
  const {
    data: messages,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
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
    <div className={styles.container} id="scrollableDiv">
      <InfiniteScroll
        dataLength={messageList.length}
        scrollableTarget="scrollableDiv"
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className={styles.nextLoaderContainer}>
            <Loader />
          </div>
        }
        inverse={true}
        className={styles.scrollContainer}
      >
        {messageList.map((message) => (
          <div
            key={message._id}
            className={clsx(
              styles.messageContainer,
              message.sender === MESSAGE.SENDER_TYPE_INDEX.CLIENT
                ? styles.rightMessageContainer
                : styles.leftMessageContainer
            )}
          >
            <div>{message.text}</div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export { ClientChatList };
