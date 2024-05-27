"use client";

import styles from "./userNav.module.css";

import { LOCAL_STORAGE } from "@/constants/localStorage";
import { useIsFirstRender } from "@/hooks/isFirstRender";
import { useSessionUser } from "@/queries/user";
import { Button } from "@/components/button/button";
import { Dropdown } from "@/components/dropdown/dropdown";

import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { QUERY } from "@/constants/query";

const UserNav: React.FC = () => {
  const isFirstRender = useIsFirstRender();
  const queryClient = useQueryClient();

  const { data: user, isFetched } = useSessionUser();

  const signOut = () => {
    localStorage.removeItem(LOCAL_STORAGE.OMBUR_USER_ID);
    queryClient.setQueryData(QUERY.QUERY_KEYS.GET_SESSION_USER, null);
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

      {user ? (
        <Dropdown
          handle={<div className={styles.right}>{user.name} </div>}
          content={
            <div className={styles.content}>
              <Button
                onClick={async () => signOut()}
                hasBackground={false}
                hasBorderRadius={false}
              >
                <div className={styles.contentButton}>
                  <LogOut size={16} />
                  <div className={styles.buttonText}>Sign out</div>
                </div>
              </Button>
            </div>
          }
        />
      ) : null}
    </nav>
  );
};

export { UserNav };
