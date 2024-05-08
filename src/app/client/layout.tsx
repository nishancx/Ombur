import { auth } from "@/../auth";
import { ClientNav } from "./components";
import { Metadata } from "next";

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
    <>
      <ClientNav session={session} />
      {children}
    </>
  );
}
