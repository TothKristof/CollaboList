'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StratusProvider } from '@kinsta/stratus'

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
            height: '100dvh',
            margin: 0,
            backgroundColor: '#020024',
            backgroundImage: 'linear-gradient(163deg,rgba(2, 0, 36, 1) 78%, rgba(9, 9, 121, 1) 100%)',
            color: 'white',
          }}>
          <>{children}</>
        </body>
      </html>
    </StratusProvider>
  );
}
