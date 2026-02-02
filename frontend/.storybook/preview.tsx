import { ThemeProvider } from '@emotion/react'
import { lightTheme } from '../app/themes'
import type { Preview } from '@storybook/react'
import { AuthProvider } from "../context/authContext";

// Preview dekorátor
const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </ThemeProvider>
    ),
  ],
}

export default preview
