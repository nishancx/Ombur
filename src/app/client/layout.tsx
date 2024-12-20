import { ClientNav } from "./components/clientNav/clientNav";
import { Modals } from "./components/modals/modals";

import { ReactQueryClientProvider } from "@/components/reactQueryClientProvider/reactQueryClientProvider";
import { auth } from "@/../auth";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Ombur - Client",
  description: "Ombur App - Client Portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <ReactQueryClientProvider>
      <Modals />
      <ClientNav session={session} />

      {/* added suspense to wrap useSearchParams */}
      {/* to do, suspend issues page properly instead of whole user layout */}
      <Suspense>{children}</Suspense>
    </ReactQueryClientProvider>
  );
}
