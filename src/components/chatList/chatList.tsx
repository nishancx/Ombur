"use client";

import styles from "./chatList.module.css";
import { fetchChat } from "./serverActions";

import { GlobalPageParams } from "@/types/query";
import { Message } from "@/types/models/message";
import { reduceInfiniteData } from "@/utils/query";
import { MESSAGE } from "@/constants/message";

import { Loader } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import clsx from "clsx";
import { QUERY } from "@/constants/query";

type ClientChatListProps = {
  issueId: string;
  sender:
    | typeof MESSAGE.SENDER_TYPE_INDEX.CLIENT
    | typeof MESSAGE.SENDER_TYPE_INDEX.USER;
};

const ClientChatList: React.FC<ClientChatListProps> = ({ issueId, sender }) => {
  const {
    data: messages,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey:
      sender === MESSAGE.SENDER_TYPE_INDEX.CLIENT
        ? QUERY.QUERY_KEYS.GET_CLIENT_CHAT({ issueId })
        : QUERY.QUERY_KEYS.GET_USER_CHAT({ issueId }),
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
              message.sender === sender
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
