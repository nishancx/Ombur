import styles from "./index.module.css";

const HomePageContent: React.FC = () => {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
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

      <div className={styles.gettingStarted}>
        <div className={styles.gettingStartedInnerContainer}>
          <div className={styles.gettingStartedTitle}>Getting started</div>
          <div className={styles.gettingStartedDescription}>
            <ul className={styles.gettingStartedList}>
              <li>Sign Up</li>
              <li>Get your URL from dropdown in navigation bar</li>
              <li>Share the URL to your users</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export { HomePageContent };
