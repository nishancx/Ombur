"use client";

import Image from "next/image";
import styles from "./user-nav.module.css";

const UserNav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/icon.webp" alt="Ombur" width={32} height={32} />
        <div className={styles.title}>Ombur</div>
      </div>
    </nav>
  );
};

export { UserNav };
