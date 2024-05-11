"use client";

import Image from "next/image";
import styles from "./userNav.module.css";
import { LOCAL_STORAGE } from "@/constants";
import { useIsFirstRender } from "@/hooks";
import { useUser } from "@/queries";
import { useQueryClient } from "@tanstack/react-query";

const UserNav: React.FC = () => {
  const isFirstRender = useIsFirstRender();
  const queryClient = useQueryClient();

  const { data: user, isFetched } = useUser();

  const signOut = () => {
    localStorage.removeItem(LOCAL_STORAGE.OMBUR_USER_ID);
    queryClient.setQueryData(["getUser"], null);
  };

  // Return null if it's the first render to avoid hydration error
  if (isFirstRender) {
    return null;
  }

  if (isFetched && !user) {
    signOut();
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/icon.webp" alt="Ombur" width={32} height={32} />
        <div className={styles.title}>Ombur</div>
      </div>

      {user ? <div className={styles.right}>{user.name} </div> : null}
    </nav>
  );
};

export { UserNav };
