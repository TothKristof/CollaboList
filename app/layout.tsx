'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StratusProvider } from '@kinsta/stratus'
import { AuthProvider } from "@/context/authContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StratusProvider language="en">
        <html>
          <body
            className={` ${inter.variable}`}
            style={{
              display: 'flex',
              height: '100dvh',
              margin: 0,
              backgroundImage: 'linear-gradient(163deg,rgb(230, 209, 199) 70%, rgb(60, 60, 204) 100%)',
              padding: '24px',
              justifyContent: 'center'
            }}>
            <AuthProvider>{children}</AuthProvider>
          </body>
        </html>
    </StratusProvider>
  );
}
