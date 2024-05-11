"use client";

import Image from "next/image";
import styles from "./userNav.module.css";
import { getItemFromLocalStorage, userStore } from "@/libs/client";
import { LOCAL_STORAGE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { getUserServerAction } from "./serverActions";
import { useIsFirstRender } from "@/hooks";

const UserNav: React.FC = () => {
  const savedUserId = getItemFromLocalStorage<string>({
    key: LOCAL_STORAGE.OMBUR_USER_ID,
  });
  const isFirstRender = useIsFirstRender();

  const { data: user, isFetched } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await getUserServerAction({ userId: savedUserId! }),
    enabled: !!savedUserId,
  });

  userStore.setUser({ user: savedUserId ? user : null });

  // Return null if it's the first render to avoid hydration error
  if (isFirstRender) {
    return null;
  }

  if (isFetched && !user) {
  }

  console.log("isFetched", isFetched);

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/icon.webp" alt="Ombur" width={32} height={32} />
        <div className={styles.title}>Ombur</div>
      </div>

      {savedUserId && user ? (
        <div className={styles.right}>{user.name}</div>
      ) : null}
    </nav>
  );
};

export { UserNav };
