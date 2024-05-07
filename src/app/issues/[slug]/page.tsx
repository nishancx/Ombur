"use client";

import { getItemFromLocalStorage } from "@/libs/client";
import styles from "./page.module.css";
import { LOCAL_STORAGE } from "@/constants";
import { useState } from "react";
import { CreateUser } from "./components/create-user/create-user";

export default function CreateIssue({ params }: { params: { slug: string } }) {
  const [savedUserId, setSavedUserId] = useState<string | undefined>(
    fetchSavedUserId()
  );

  function fetchSavedUserId() {
    return getItemFromLocalStorage<string>({
      key: LOCAL_STORAGE.OMBUR_USER,
    });
  }

  const clientEmail = decodeURIComponent(atob(params.slug));

  if (!savedUserId) {
    return <CreateUser setSavedUserId={setSavedUserId} />;
  }

  return <div className={styles.title}>{clientEmail}</div>;
}
