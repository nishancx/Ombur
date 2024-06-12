import { ClientBlock } from "./components/client/client";

import { auth } from "@/../auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return <ClientBlock />;
}
