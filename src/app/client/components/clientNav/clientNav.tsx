"use client";

import Image from "next/image";
import styles from "./clientNav.module.css";
import { Button, Dropdown } from "@/components";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Link, LogOut } from "lucide-react";
import { modalStore } from "@/libs/client";
import { getSessionClient } from "./serverActions";
import { ClientDataSearchParam } from "@/types";

type NavProps = {
  session: Session | null;
};

const ClientNav: React.FC<NavProps> = ({ session }) => {
  const handleGetIssueLink = async () => {
    if (!session!.user!.email) return;

    const sessionClient = await getSessionClient();

    if (!sessionClient) return;

    const clientData: ClientDataSearchParam = { id: sessionClient._id };

    const encodedClientData = btoa(
      encodeURIComponent(JSON.stringify(clientData))
    );
    const issueLink = `${process.env.NEXT_PUBLIC_WEB_DOMAIN_URL}/user/issues?clientData=${encodedClientData}`;

    modalStore.issueLinkModal.setIssueLink({
      issueLink,
    });
    modalStore.issueLinkModal.open();
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
