"use client";

import { signIn, useSession } from "next-auth/react";
import styles from "./index.module.css";

import { Button } from "@/components/button/button";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const HomePageContent: React.FC = () => {
  const session = useSession();

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

            {session.status === "unauthenticated" ||
            session?.data?.user?.type === "user" ? (
              <Button
                className={styles.dashboardButton}
                onClick={async () =>
                  await signIn("google", { callbackUrl: "/client" })
                }
              >
                <div>Try Ombur</div>
              </Button>
            ) : (
              <Link href="/client" className={styles.dashboardButtonLink}>
                <Button className={styles.dashboardButton}>
                  <div>Try Ombur</div>

                  <ArrowRight size={24} />
                </Button>
              </Link>
            )}
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

      <div className={styles.onboarding}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <h2 className={styles.onboardingTitle}>
              Onboarding users made easy with Ombur
            </h2>

            <p className={styles.onboardingDescription}>
              Just share the URL with your users and start chatting with them
              after they complete two simple steps:
            </p>

            <div className={styles.stepsContainer}>
              <div className={styles.step}>
                <div className={styles.stepTitle}>Provide name</div>
                <div className={styles.stepImage}>
                  <Image
                    src="/images/name-form.webp"
                    alt="name form"
                    className={styles.dashboardImage}
                    width={450}
                    height={150}
                  />
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepTitle}>Create an issue</div>
                <div className={styles.stepImage}>
                  <Image
                    src="/images/issue-form.webp"
                    alt="issue form"
                    className={styles.dashboardImage}
                    width={450}
                    height={150}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dashboard}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <h2 className={styles.dashboardTitle}>
              Manage all issues in our dashboard, revisit resolved issues for
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