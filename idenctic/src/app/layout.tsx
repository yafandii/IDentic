// Root Layout

import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/infrastructure/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
