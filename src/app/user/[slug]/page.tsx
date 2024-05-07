"use client";

import { userIdStore } from "@/libs/client";
import styles from "./page.module.css";
import { CreateUser } from "./components/create-user/create-user";
import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";

export default function CreateIssue({ params }: { params: { slug: string } }) {
  const clientEmail = decodeURIComponent(atob(params.slug));
  const { userId: userIdSnapshot } = useSnapshot(userIdStore);

  // directly using the snapshot value will cause hydration mismatch
  const [userId, setUserId] = useState<string | undefined | null>(null);

  useEffect(() => {
    setUserId(userIdSnapshot);
  }, [userIdSnapshot]);

  if (userId === null) {
    return null;
  }

  if (!userId) {
    return <CreateUser clientEmail={clientEmail} />;
  }

  return <div className={styles.title}>{clientEmail}</div>;
}
