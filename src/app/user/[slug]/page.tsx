"use client";

import { userIdStore } from "@/libs/client";
import styles from "./page.module.css";
import { CreateUser } from "./components/create-user/create-user";
import { useSnapshot } from "valtio";
import { useIsFirstRender } from "@/hooks";

export default function CreateIssue({ params }: { params: { slug: string } }) {
  const clientEmail = decodeURIComponent(atob(params.slug));
  const { userId } = useSnapshot(userIdStore);
  const isFirstRender = useIsFirstRender();

  if (isFirstRender || userId === null) {
    return null;
  }

  if (!userId) {
    return <CreateUser clientEmail={clientEmail} />;
  }

  return <div className={styles.title}>{clientEmail}</div>;
}
