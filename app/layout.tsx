'use client'
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
              backgroundColor: 'rgb(230, 209, 199)',
              padding: '24px',
              justifyContent: 'center'
            }}>
            <AuthProvider>{children}</AuthProvider>
          </body>
        </html>
    </StratusProvider>
  );
}
