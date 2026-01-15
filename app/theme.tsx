'use client'
import React, { useMemo } from 'react';
import { ThemeProvider, Global, Theme, CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
 
const theme: Theme = {
  colors: {
    primary: '#020024',
    secondary: '#ffffff',
    main: '#00d439',
  },
};

type ThemeProps = {
  children: React.ReactNode;
};

export function EmotionThemeProvider({ children }: ThemeProps) {
  const cache = useMemo(
    () =>
      createCache({
        key: 'css',
        prepend: true,
      }),
    []
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor: '#020024',
              backgroundImage: 'linear-gradient(163deg,rgba(2, 0, 36, 1) 78%, rgba(9, 9, 121, 1) 100%)',
              color: theme.colors.secondary,
            },
          })}
        />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
 
