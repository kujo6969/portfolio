"use client";

import { ThemeProvider } from "next-themes";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={["light", "dark", "retro", "cartoon", "cute", "vapor"]}
    >
      {children}
    </ThemeProvider>
  );
}
