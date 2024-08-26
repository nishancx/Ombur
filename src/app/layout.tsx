import "./globals.css";

import { Modals } from "./components/modals/modals";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionContextValue, SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ombur",
  description: "Ombur App",
};

export default async function RootLayout({
  children,
  params: { session },
}: Readonly<{
  children: React.ReactNode;
  params: { session: SessionContextValue };
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session?.data}>
          <AntdRegistry>{children}</AntdRegistry>
          <Modals />
        </SessionProvider>
      </body>
    </html>
  );
}
