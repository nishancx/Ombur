import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Communication with users made easier
          </h1>
          <p className={styles.heroDescription}>
            Stop using email to communicate with your users. Switch to Ombur,
            enjoy live chat with custom build features.
          </p>
        </div>
      </div>
    </div>
  );
}
