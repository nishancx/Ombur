import { ClientBlock } from "./components/client/client";

import { auth } from "@/../auth";

import { redirect } from "next/navigation";

export default async function Home({
  params: { currentIssueId },
}: {
  params: { currentIssueId: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <ClientBlock currentIssueId={currentIssueId} />;
}
