import { ClientPageContent } from "./components";

import { getToken } from "@/utils/cookies";
import { auth } from "@/../auth";

import { cookies as getCookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default async function Client() {
  const cookies = getCookies();
  const authToken = getToken({ cookies });
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <ClientPageContent authToken={authToken} user={session?.user} />;
}
