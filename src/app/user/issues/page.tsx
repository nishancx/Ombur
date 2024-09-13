import { CreateUser } from "./components/createUser/createUser";
import { IssuesContent } from "./components";

import { MESSAGE } from "@/constants/message";
import { auth } from "@/../auth";
import { getToken } from "@/utils/cookies";

import { cookies as getCookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default async function Issues() {
  const session = await auth();
  const cookies = getCookies();
  const authToken = getToken({ cookies });

  if (!session) {
    return <CreateUser />;
  }

  if (session?.user?.type === MESSAGE.SENDER_TYPE_INDEX.CLIENT) {
    redirect("/");
  }

  return <IssuesContent user={session?.user} authToken={authToken} />;
}
