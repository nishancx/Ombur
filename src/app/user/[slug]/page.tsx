"use client";

import { getItemFromLocalStorage } from "@/libs/client";
import styles from "./page.module.css";
import { LOCAL_STORAGE } from "@/constants";
import { useEffect, useState } from "react";
import { CreateUser } from "./components/create-user/create-user";

export default function CreateIssue({ params }: { params: { slug: string } }) {
  const [savedUserId, setSavedUserId] = useState<string | undefined | null>(
    null
  );
  const clientEmail = decodeURIComponent(atob(params.slug));

  const fetchSavedUserId = () => {
    return getItemFromLocalStorage<string>({
      key: LOCAL_STORAGE.OMBUR_USER_ID,
    });
  };

  useEffect(() => {
    setSavedUserId(fetchSavedUserId());
  }, []);

  if (savedUserId === null) {
    return null;
  }

  if (!savedUserId) {
    return (
      <CreateUser clientEmail={clientEmail} setSavedUserId={setSavedUserId} />
    );
  }

  return <div className={styles.title}>{clientEmail}</div>;
}
