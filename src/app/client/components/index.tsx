"use client";

import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { ClientLeftPane } from "./leftPane/leftPane";
import { ClientRightPane } from "./rightPane/rightPane";
import { useClientIssues } from "../queries";

import { issueStore } from "@/libs/client/stores/issue";
import { Message } from "@/types/models/message";
import { QUERY } from "@/constants/query";
import { FullSpanLoader } from "@/components/fullSpanLoader/fullSpanLoader";
import { MESSAGE } from "@/constants/message";
import { AuthUser } from "@/types/auth";
import { Button } from "@/components/button/button";

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
  const encodedClientData = btoa(
    encodeURIComponent(JSON.stringify({ id: user.id }))
  );
  const issueLink = `${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/user/issues?clientData=${encodedClientData}`;
  const { data: clientIssues, isLoading: isLoadingClientIssues } =
    useClientIssues();

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

    return (
      <div className={styles.container}>
        <FullSpanLoader />
      </div>
    );
  }

  if (isLoadingClientIssues) {
    return (
      <div className={styles.container}>
        <FullSpanLoader />
      </div>
    );
  }

  if (!isLoadingClientIssues && !clientIssues?.length)
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.issueLinkContainer}>
            <div className={styles.issueLinkTitle}>
              Please share this link to your users:
            </div>

            <div className={styles.issueLinkDisplayContainer}>
              <div className={styles.issueLinkDisplay}>{issueLink}</div>
              <Button
                text="Copy"
                onClick={() => {
                  window.navigator.clipboard.writeText(issueLink);
                  toast.success("Copied to clipboard.");
                }}
                className={styles.copyButton}
              />
            </div>

            <div className={styles.issueLinkSubtitle}>
              <div>Users can create issues with this link.</div>
              <div>Issues will be shown here once a user creates one.</div>
            </div>
          </div>
        </div>
      </div>
    );

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
