"use client";

import Image from "next/image";
import styles from "./nav.module.css";
import { Button, Dropdown } from "@/components";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

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

      {session ? (
        <Dropdown
          handle={
            <Image
              src={session?.user?.image || "/person.webp"}
              alt="Ombur"
              width={32}
              height={32}
              className={styles.clientImage}
            />
          }
          content={
            <Button onClick={async () => await signOut()} showBorder={false}>
              Sign out
            </Button>
          }
        />
      ) : (
        <Button onClick={async () => await signIn("google")}>Sign in</Button>
      )}
    </nav>
  );
};

export { Nav };
