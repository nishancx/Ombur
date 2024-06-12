import { ClientPageContent } from "./components";

import { auth } from "@/../auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return <ClientPageContent />;
}
