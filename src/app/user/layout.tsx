"use client";

import { LOCAL_STORAGE } from "@/constants";
import { getItemFromLocalStorage, userIdStore } from "@/libs/client";
import { UserNav } from "./components";

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
