import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../(withoutNabar)/globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Tracker",
  description: "Track Your Money Where is going",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
