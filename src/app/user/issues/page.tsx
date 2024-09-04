"use client";

import styles from "./page.module.css";
import { CreateUser } from "./components/createUser/createUser";
import { Issues } from "./components";
import { getClientDataFromSearchParam } from "./utils";

import { FullSpanLoader } from "@/components/fullSpanLoader/fullSpanLoader";
import { MESSAGE } from "@/constants/message";
import { Loading } from "@/components/loading/loading";

import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function CreateIssue() {
  const searchParams = useSearchParams();
  const clientDataParam = searchParams.get("clientData");
  const router = useRouter();

  const clientData = getClientDataFromSearchParam({
    clientDataParam: clientDataParam,
  });

  const session = useSession();

  if (session?.status === "loading") {
    return <Loading className={styles.loader} />;
  }

  if (session?.data?.user?.type === MESSAGE.SENDER_TYPE_INDEX.CLIENT) {
    router.push("/");
    return <FullSpanLoader />;
  }

  // Redirect to home page if clientData is not available
  if (!clientDataParam || !clientData) {
    return (window.location.href = "/");
  }

  if (!session?.data?.user) {
    return <CreateUser />;
  }

  // If userId is available, show user's issues for the client
  return <Issues clientId={clientData.id} user={session?.data?.user} />;
}
