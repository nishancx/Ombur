import { Modals } from "./components/modals/modals";
import { UserNav } from "./components/userNav/userNav";

import { ReactQueryClientProvider } from "@/components/reactQueryClientProvider/reactQueryClientProvider";
import { auth } from "@/../auth";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Ombur - User",
  description: "Ombur App - User Portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <ReactQueryClientProvider>
      <Modals session={session} />
      <UserNav session={session} />

      {/* added suspense to wrap useSearchParams */}
      {/* to do, suspend issues page properly instead of whole user layout */}
      <Suspense>{children}</Suspense>
    </ReactQueryClientProvider>
  );
}
