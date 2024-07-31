import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import SessionProvider from "@/utils/SessionProvider";
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
      <SessionProvider>
      <head>
      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          <div>{children}</div>
        </ReactQueryProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
