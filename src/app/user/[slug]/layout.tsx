import { UserNav } from "@/components";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserNav />
      {children}
    </>
  );
}
