'use client'
import { Inter } from "next/font/google";
import { StratusProvider, space } from '@kinsta/stratus'
import { AuthProvider } from "@/context/authContext";
import styled from "@emotion/styled";
import { ThemeProvider } from "@/context/themeContext";
import { useTheme } from "@emotion/react";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const StyledBody = styled.body((props) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100dvh',
  margin: 0,
  background: props.theme.colors.background,
  padding: space[300],
  justifyContent: 'center',
  boxSizing: 'border-box',
  overflowY: 'auto',
}))

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ThemeProvider>
      <StratusProvider language="en">
        <html>
          <StyledBody className={` ${inter.variable}`}>
            <AuthProvider>
              <Navbar></Navbar>
              {children}
              </AuthProvider>
          </StyledBody>
        </html>
      </StratusProvider>
    </ThemeProvider>
  );
}
