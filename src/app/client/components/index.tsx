"use client";

import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { ClientLeftPane } from "./leftPane/leftPane";
import { ClientRightPane } from "./rightPane/rightPane";

import { issueStore } from "@/libs/client/stores/issue";
import { Message } from "@/types/models/message";
import { QUERY } from "@/constants/query";

import clsx from "clsx";
import { useSnapshot } from "valtio";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

const ClientPageContent: React.FC = () => {
  const { currentIssue } = useSnapshot(issueStore.clientsCurrentIssue);
  const [sseStatus, setSseStatus] = useState<null | "connecting" | "connected">(
    null
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    let events: EventSource;

    if (!sseStatus) {
      events = new EventSource(
        `${process.env.NEXT_PUBLIC_SERVICES_WEB_DOMAIN_URL}/register-sse`,
        { withCredentials: true }
      );

      events.onmessage = (rawMessage) => {
        console.log("rawMessage", rawMessage);
        //   const message = JSON.parse(rawMessage.data);

        //   const issueId = message?.issueId;

        //   if (!issueId) return;

        //   const previousMessages:
        //     | InfiniteData<
        //         {
        //           data: Message[];
        //           page: number;
        //         },
        //         number
        //       >
        //     | undefined = queryClient.getQueryData(
        //     QUERY.QUERY_KEYS.GET_CLIENT_CHAT({ issueId })
        //   );

        //   queryClient.setQueryData(
        //     QUERY.QUERY_KEYS.GET_CLIENT_CHAT({ issueId }),
        //     {
        //       pages: [
        //         {
        //           data: [message, ...(previousMessages?.pages?.[0]?.data || [])],
        //           page: 0,
        //         },
        //         ...(previousMessages?.pages
        //           ? previousMessages.pages.slice(1)
        //           : []),
        //       ],
        //       pageParams: previousMessages?.pageParams,
        //     }
        //   );
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
        <ClientLeftPane />
      </div>
      <div
        className={clsx(styles.right, !currentIssue?._id && styles.inactive)}
      >
        <ClientRightPane currentIssue={currentIssue} />
      </div>
    </div>
  );
};

export { ClientPageContent };
