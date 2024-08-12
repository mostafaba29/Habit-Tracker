import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { UserProvider } from "@/utils/UserProvider";
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
      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          <UserProvider>
          <div>{children}</div>
          </UserProvider>
        </ReactQueryProvider>
        </body>
    </html>
  );
}
