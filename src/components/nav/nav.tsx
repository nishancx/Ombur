import Image from "next/image";
import styles from "./nav.module.css";
import { auth, signIn, signOut } from "@/../auth";

const Nav: React.FC = async () => {
  const session = await auth();

  const handleAuth = async () => {
    "use server";

    if (session) {
      await signOut();
    } else {
      await signIn("google");
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/icon.webp" alt="Ombur" width={32} height={32} />
        <div className={styles.title}>Ombur</div>
      </div>

      <form action={handleAuth} className={styles.right}>
        {session ? (
          <>
            <Image
              src={session?.user?.image || "/user.webp"}
              alt="Ombur"
              width={32}
              height={32}
              className={styles.userImage}
            />

            <button>Sign out</button>
          </>
        ) : (
          <button>Sign in</button>
        )}
      </form>
    </nav>
  );
};

export { Nav };
