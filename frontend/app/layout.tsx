"use client";

import "./globals.css";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Providers = dynamic(() => import("./providers").then(mod => mod.Providers), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
