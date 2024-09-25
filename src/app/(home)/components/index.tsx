import styles from "./index.module.css";

import Image from "next/image";

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

      <div className={styles.dashboard}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <h2 className={styles.dashboardTitle}>
              Manage all issues in dashboard, revisit resolved issues for
              insights.
            </h2>
            <div className={styles.dashboardImageContainer}>
              <Image
                src="/images/dashboard.webp"
                alt="Dashboard"
                className={styles.dashboardImage}
                width={800}
                height={450}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { HomePageContent };
