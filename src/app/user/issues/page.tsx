import { CreateUser } from "./components/createUser/createUser";
import { IssuesContent } from "./components";

import { auth } from "@/../auth";
import { getToken } from "@/utils/cookies";

import { cookies as getCookies } from "next/dist/client/components/headers";

export default async function Issues() {
  const session = await auth();
  const cookies = getCookies();
  const authToken = getToken({ cookies });

  if (!session) {
    return <CreateUser />;
  }

  return <IssuesContent user={session?.user} authToken={authToken} />;
}
