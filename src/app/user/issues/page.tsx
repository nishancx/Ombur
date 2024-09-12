import { CreateUser } from "./components/createUser/createUser";
import { IssuesContent } from "./components";

import { MESSAGE } from "@/constants/message";
import { auth } from "@/../auth";

import { redirect } from "next/navigation";

export default async function Issues() {
  const session = await auth();

  if (!session) {
    return <CreateUser />;
  }

  if (session?.user?.type === MESSAGE.SENDER_TYPE_INDEX.CLIENT) {
    redirect("/");
  }

  return <IssuesContent user={session?.user} />;
}
