"use client";

import styles from "./index.module.css";
import { UserLeftPane } from "./leftPane/leftPane";
import { UserRightPane } from "./rightPane/rightPane";

import { issueStore } from "@/libs/client/stores/issue";
import { Message } from "@/types/models/message";
import { QUERY } from "@/constants/query";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { User } from "next-auth";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

type IssuesContentProps = {
  clientId: string;
  user: User;
};

const IssuesContent: React.FC<IssuesContentProps> = ({ clientId, user }) => {
  const { currentIssue } = useSnapshot(issueStore.usersCurrentIssue);
  const [sseStatus, setSseStatus] = useState<null | "connecting" | "connected">(
    null
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    let events: EventSource;

    if (!sseStatus) {
      events = new EventSource(
        `${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/api/chat`
      );
      events.onmessage = (rawMessage) => {
        return console.log("rawMessage", rawMessage);
        // const message = JSON.parse(rawMessage.data);

        // const issueId = message?.issueId;

        // if (!issueId) return;

        // const previousMessages:
        //   | InfiniteData<
        //       {
        //         data: Message[];
        //         page: number;
        //       },
        //       number
        //     >
        //   | undefined = queryClient.getQueryData(
        //   QUERY.QUERY_KEYS.GET_USER_CHAT({ issueId })
        // );

        // queryClient.setQueryData(QUERY.QUERY_KEYS.GET_USER_CHAT({ issueId }), {
        //   pages: [
        //     {
        //       data: [message, ...(previousMessages?.pages?.[0]?.data || [])],
        //       page: 0,
        //     },
        //     ...(previousMessages?.pages ? previousMessages.pages.slice(1) : []),
        //   ],
        //   pageParams: previousMessages?.pageParams,
        // });
      };

      setSseStatus("connected");
    }

    return () => {
      if (sseStatus) {
        events?.close();
      }
    };
  }, [sseStatus, queryClient]);

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.left, !!currentIssue?._id && styles.inactive)}
      >
        <UserLeftPane clientId={clientId} user={user} />
      </div>
      <div
        className={clsx(styles.right, !currentIssue?._id && styles.inactive)}
      >
        <UserRightPane currentIssue={currentIssue} user={user} />
      </div>
    </div>
  );
};

export { IssuesContent };
