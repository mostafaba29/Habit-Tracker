import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Upperbar from "@/components/Upperbar";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your habits in a fun,modern and visual way",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      {/* <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
