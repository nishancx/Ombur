"use client";

import styles from "./page.module.css";
import { userIdStore } from "@/libs/client";
import { CreateUser } from "./components/create-user/create-user";
import { useSnapshot } from "valtio";
import { useIsFirstRender } from "@/hooks";
import { useSearchParams } from "next/navigation";

export default function CreateIssue() {
  const searchParams = useSearchParams();
  const clientData = searchParams.get("clientData");

  const clientEmail = decodeURIComponent(atob(clientData || ""));
  const { userId } = useSnapshot(userIdStore);
  const isFirstRender = useIsFirstRender();

  // Redirect to home page if clientData is not available
  if (!clientData) {
    return (window.location.href = "/");
  }

  // Return null if it's the first render or userId is null (loading userId from local storage)
  if (isFirstRender || userId === null) {
    return null;
  }

  // If userId is not available, show create user form
  if (!userId) {
    return <CreateUser />;
  }

  // If userId is available, show user's issues for the client
  return <div className={styles.title}>{clientEmail}</div>;
}
