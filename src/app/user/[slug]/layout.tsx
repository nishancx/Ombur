"use client";

import { UserNav } from "@/components";
import { LOCAL_STORAGE } from "@/constants";
import { getItemFromLocalStorage, userIdStore } from "@/libs/client";

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
      {children}
    </>
  );
}
