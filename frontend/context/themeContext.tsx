import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme, midnightTheme, forestTheme } from '../app/themes';

export type ThemeName = 'light' | 'dark' | 'midnight' | 'forest';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light'); // alapértelmezett light

  // Csak kliens oldalon töltjük be a mentett theme-et
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    if (savedTheme) {
      setThemeName(savedTheme);
    }
  }, []);

  // Mentés localStorage-ba, ha változik
  useEffect(() => {
    localStorage.setItem('theme', themeName);
  }, [themeName]);

  const themeMap = {
    light: lightTheme,
    dark: darkTheme,
    midnight: midnightTheme,
    forest: forestTheme,
  };

  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme: setThemeName }}>
      <EmotionThemeProvider theme={themeMap[themeName]}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
