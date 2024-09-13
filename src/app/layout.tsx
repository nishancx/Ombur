import "./globals.css";

import { Modals } from "./components/modals/modals";

import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionContextValue, SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ToastContainer } from "react-toastify";

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
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            rtl={false}
            closeOnClick
            draggable
            pauseOnHover
          />
          <Modals />
        </SessionProvider>
      </body>
    </html>
  );
}
