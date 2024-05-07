import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Modals } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ombur",
  description: "Ombur App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modals />
        {children}
      </body>
    </html>
  );
}
