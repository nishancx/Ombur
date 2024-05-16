import { auth } from "@/../auth";
import { ClientNav } from "./components/clientNav/clientNav";
import { Modals } from "./components/modals/modals";
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
      <Modals />
      <ClientNav session={session} />
      {children}
    </>
  );
}
