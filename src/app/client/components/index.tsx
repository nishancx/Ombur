"use client";

import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { ClientLeftPane } from "./leftPane/leftPane";
import { ClientRightPane } from "./rightPane/rightPane";

import { issueStore } from "@/libs/client/stores/issue";
import { Message } from "@/types/models/message";
import { QUERY } from "@/constants/query";
import { FullSpanLoader } from "@/components/fullSpanLoader/fullSpanLoader";
import { MESSAGE } from "@/constants/message";
import { AuthUser } from "@/types/auth";

import clsx from "clsx";
import { useSnapshot } from "valtio";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type ClientPageContentProps = {
  authToken: string;
  user: AuthUser;
};

const ClientPageContent: React.FC<ClientPageContentProps> = ({
  authToken,
  user,
}) => {
  const { currentIssue } = useSnapshot(issueStore.clientsCurrentIssue);
  const [sseStatus, setSseStatus] = useState<null | "connecting" | "connected">(
    null
  );
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    let events: EventSource;

    if (!sseStatus) {
      fetchEventSource(
        `${process.env.NEXT_PUBLIC_SERVICES_WEB_DOMAIN_URL}/register-sse`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
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
              QUERY.QUERY_KEYS.GET_CLIENT_CHAT({ issueId })
            );

            queryClient.setQueryData(
              QUERY.QUERY_KEYS.GET_CLIENT_CHAT({ issueId }),
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
  }, [sseStatus, queryClient, authToken]);

  useEffect(() => {
    if (user?.type === MESSAGE.SENDER_TYPE_INDEX.USER) {
      toast.error("Please sign in again.");
    }
  }, [user?.type]);

  if (user?.type === MESSAGE.SENDER_TYPE_INDEX.USER) {
    router.push("/");

    return <FullSpanLoader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div
          className={clsx(styles.left, !!currentIssue?._id && styles.inactive)}
        >
          <ClientLeftPane />
        </div>
        <div
          className={clsx(styles.right, !currentIssue?._id && styles.inactive)}
        >
          <ClientRightPane currentIssue={currentIssue} authToken={authToken} />
        </div>
      </div>
    </div>
  );
};

export { ClientPageContent };
