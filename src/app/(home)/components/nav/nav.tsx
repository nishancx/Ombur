"use client";

import styles from "./nav.module.css";

import { Button } from "@/components/button/button";
import { Loading } from "@/components/loading/loading";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";

const Nav: React.FC = () => {
  const session = useSession();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image src="/images/icon.webp" alt="Ombur" width={32} height={32} />
          <div className={styles.title}>Ombur</div>
        </div>

        {session.status === "loading" ? (
          <Loading />
        ) : session.status === "unauthenticated" ||
          session?.data?.user?.type === "user" ? (
          <Button
            className={styles.signInButton}
            onClick={async () =>
              await signIn("google", { callbackUrl: "/client" })
            }
            hasBackground={false}
          >
            <Image src="/images/google.svg" alt="Google" width={20} height={20} />
            <div>
              Sign in
              <span className={styles.hideOnSmallScreen}> with Google</span>
            </div>
          </Button>
        ) : (
          <Link href="/client" className={styles.dashboardButtonLink}>
            <Button className={styles.dashboardButton}>
              <div>
                <span className={styles.hideOnSmallScreen}>
                  Go to dashboard
                </span>
                <span className={styles.showOnSmallScreen}>Dashboard</span>
              </div>

              <ArrowRight size={24} />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export { Nav };
