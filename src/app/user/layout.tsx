import { Metadata } from "next";
import { ReactQueryClientProvider, UserNav, Modals } from "./components";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Ombur - User",
  description: "Ombur App - User Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <Modals />
      <UserNav />

      {/* added suspense to wrap useSearchParams */}
      {/* to do, suspend issues page properly instead of whole user layout */}
      <Suspense>{children}</Suspense>
    </ReactQueryClientProvider>
  );
}
