"use client";

import { getItemFromLocalStorage } from "@/libs/client";
import styles from "./page.module.css";
import { LOCAL_STORAGE } from "@/constants";

export default function CreateIssue({ params }: { params: { slug: string } }) {
  const savedUserId = getItemFromLocalStorage<{ id: string }>({
    key: LOCAL_STORAGE.OMBUR_USER,
  });
  const clientEmail = decodeURIComponent(atob(params.slug));

  if (!savedUserId) {
    return <div className={styles.title}>create user</div>;
  }

  return <div className={styles.title}>{clientEmail}</div>;
}
