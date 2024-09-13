import { ClientPageContent } from "./components";

import { getToken } from "@/utils/cookies";

import { cookies as getCookies } from "next/dist/client/components/headers";

export default async function Client() {
  const cookies = getCookies();
  const authToken = getToken({ cookies });

  return <ClientPageContent authToken={authToken} />;
}
