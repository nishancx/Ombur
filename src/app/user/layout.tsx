"use client";

import { LOCAL_STORAGE } from "@/constants";
import { getItemFromLocalStorage, userIdStore } from "@/libs/client";
import { UserNav } from "./components";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedUserId = getItemFromLocalStorage<string>({
    key: LOCAL_STORAGE.OMBUR_USER_ID,
  });

  userIdStore.setUserId({ userId: savedUserId });

  return (
    <>
      <UserNav />
      {/* added suspense to wrap useSearchParams */}
      {/* to do, suspend issues page properly instead of whole user layout */}
      <Suspense>{children}</Suspense>
    </>
  );
}
