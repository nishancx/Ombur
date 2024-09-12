"use client";

import styles from "./index.module.css";
import { UserLeftPane } from "./leftPane/leftPane";
import { UserRightPane } from "./rightPane/rightPane";
import { getClientDataFromSearchParam } from "../utils";

import { issueStore } from "@/libs/client/stores/issue";
import { Message } from "@/types/models/message";
import { QUERY } from "@/constants/query";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { User } from "next-auth";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useSearchParams } from "next/navigation";

type IssuesContentProps = {
  user: User;
};

const IssuesContent: React.FC<IssuesContentProps> = ({ user }) => {
  const { currentIssue } = useSnapshot(issueStore.usersCurrentIssue);
  const [sseStatus, setSseStatus] = useState<null | "connecting" | "connected">(
    null
  );
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const clientDataParam = searchParams.get("clientData");
  const clientData = getClientDataFromSearchParam({
    clientDataParam: clientDataParam,
  });

  useEffect(() => {
    let events: EventSource;

    if (!sseStatus) {
      fetchEventSource(
        `${process.env.NEXT_PUBLIC_SERVICES_WEB_DOMAIN_URL}/register-sse`,
        {
          credentials: "include",
          onmessage(ev) {
            const message = JSON.parse(ev.data);
            const issueId = message?.issueId;

            if (!issueId) return;

            const previousMessages:
              | InfiniteData<
                  {
                    data: Message[];
                    page: number;
                  },
                  number
                >
              | undefined = queryClient.getQueryData(
              QUERY.QUERY_KEYS.GET_USER_CHAT({ issueId })
            );

            queryClient.setQueryData(
              QUERY.QUERY_KEYS.GET_USER_CHAT({ issueId }),
              {
                pages: [
                  {
                    data: [
                      message,
                      ...(previousMessages?.pages?.[0]?.data || []),
                    ],
                    page: 0,
                  },
                  ...(previousMessages?.pages
                    ? previousMessages.pages.slice(1)
                    : []),
                ],
                pageParams: previousMessages?.pageParams,
              }
            );
          },
          openWhenHidden: true,
        }
      ).then(() => {
        setSseStatus("connected");
      });
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
        <UserLeftPane clientId={clientData?.id || ""} user={user} />
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
