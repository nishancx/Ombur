"use client";

import styles from "./nav.module.css";

import { signIn, useSession } from "next-auth/react";

import Image from "next/image";
import { Button } from "@/components/button/button";
import { Loading } from "@/components/loading/loading";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Nav: React.FC = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/icon.webp" alt="Ombur" width={32} height={32} />
        <div className={styles.title}>Ombur</div>
      </div>

      {session.status === "loading" ? (
        <Loading />
      ) : session.status === "unauthenticated" ? (
        <Button
          className={styles.signInButton}
          onClick={async () => await signIn("google")}
          hasBackground={false}
        >
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          <div>Sign in with Google</div>
        </Button>
      ) : (
        <Button
          className={styles.dashboardButton}
          onClick={() => router.push("/client")}
        >
          <div>Go to dashboard</div>
          <ArrowRight size={24} />
        </Button>
      )}
    </nav>
  );
};

export { Nav };
