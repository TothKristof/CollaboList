'use client'
import { Inter } from "next/font/google";
import { StratusProvider, body, space } from '@kinsta/stratus'
import { AuthProvider } from "@/context/authContext";
import styled from "@emotion/styled";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const StyledBody = styled.body({
  display: 'flex',
  height: '100dvh',
  margin: 0,
  backgroundColor: 'rgb(230, 209, 199)',
  padding: space[300],
  justifyContent: 'center'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StratusProvider language="en">
      <html>
          <StyledBody className={` ${inter.variable}`}>
            <AuthProvider>{children}</AuthProvider>
          </StyledBody>
      </html>
    </StratusProvider>
  );
}
