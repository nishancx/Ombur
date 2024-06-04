import { ClientBlock } from "./components/client/client";

import { auth } from "@/../auth";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <ClientBlock />;
}
