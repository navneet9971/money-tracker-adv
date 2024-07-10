import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../(withoutNabar)/globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Tracker",
  description: "Track Your Money Where it is going",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
