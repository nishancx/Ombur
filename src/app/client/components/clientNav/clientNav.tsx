"use client";

import styles from "./clientNav.module.css";

import { Button } from "@/components/button/button";
import { Dropdown } from "@/components/dropdown/dropdown";
import { modalStore } from "@/libs/client/stores/modal";
import { ClientDataSearchParam } from "@/types/searchParams";
import { FILE_PATHS } from "@/constants/filePaths";

import { Link, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

type NavProps = {
  session: Session | null;
};

const ClientNav: React.FC<NavProps> = ({ session }) => {
  const handleGetIssueLink = async () => {
    if (!session?.user?.id) {
      return;
    }

    const clientData: ClientDataSearchParam = { id: session.user.id };

    const encodedClientData = btoa(
      encodeURIComponent(JSON.stringify(clientData))
    );
    const issueLink = `${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/user/issues?clientData=${encodedClientData}`;

    modalStore.issueLinkModal.open({
      issueLink,
    });
  };

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
              src={session.user.image || FILE_PATHS.DEFAULT_USER_IMAGE}
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

              <Button
                hasBackground={false}
                hasBorderRadius={false}
                onClick={handleGetIssueLink}
              >
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
        <Button onClick={async () => await signIn("google")}>
          <div className={styles.signInButtonText}>Sign in</div>
        </Button>
      )}
    </nav>
  );
};

export { ClientNav };
