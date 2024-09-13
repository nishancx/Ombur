"use client";

import styles from "./userNav.module.css";

import { Button } from "@/components/button/button";
import { Dropdown } from "@/components/dropdown/dropdown";
import { AuthSession } from "@/types/auth";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

type UserNavProps = {
  session: AuthSession | null;
};

const UserNav: React.FC<UserNavProps> = ({ session }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/icon.webp" alt="Ombur" width={32} height={32} />
        <div className={styles.title}>Ombur</div>
      </div>

      {!!session ? (
        <Dropdown
          handle={<div className={styles.right}>{session?.user?.name} </div>}
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
