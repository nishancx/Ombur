import styles from "./page.module.css";

import { auth } from "../../../auth";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <div className={styles.title}>Client</div>;
}
