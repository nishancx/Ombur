import { auth } from "@/../auth";
import { ClientNav } from "@/components";

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
