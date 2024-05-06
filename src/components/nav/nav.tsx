"use client";

import Image from "next/image";
import styles from "./nav.module.css";
import { Button, Dropdown } from "@/components";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Link, LogOut } from "lucide-react";

type NavProps = {
  session: Session | null;
};

const Nav: React.FC<NavProps> = ({ session }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/icon.webp" alt="Ombur" width={32} height={32} />
        <div className={styles.title}>Ombur</div>
      </div>

      {session?.user ? (
        <Dropdown
          handle={
            <Image
              src={session.user.image || "/person.webp"}
              alt="Ombur"
              width={32}
              height={32}
              className={styles.clientImage}
            />
          }
          content={
            <div className={styles.content}>
              <div className={styles.contentUserInfo}>
                <div>{session.user.name}</div>
                <div>{session.user.email}</div>
              </div>

              <Button hasBackground={false} hasBorderRadius={false}>
                <div className={styles.contentButton}>
                  <Link size={16} />
                  <div className={styles.buttonText}>Get issue link</div>
                </div>
              </Button>

              <Button
                onClick={async () => await signOut()}
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
      ) : (
        <Button onClick={async () => await signIn("google")}>Sign in</Button>
      )}
    </nav>
  );
};

export { Nav };
