"use client";

import Image from "next/image";
import styles from "./userNav.module.css";
import { getItemFromLocalStorage, userIdStore } from "@/libs/client";
import { LOCAL_STORAGE } from "@/constants";

const UserNav: React.FC = () => {
  const savedUserId = getItemFromLocalStorage<string>({
    key: LOCAL_STORAGE.OMBUR_USER_ID,
  });

  userIdStore.setUserId({ userId: savedUserId });

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/icon.webp" alt="Ombur" width={32} height={32} />
        <div className={styles.title}>Ombur</div>
      </div>
    </nav>
  );
};

export { UserNav };
