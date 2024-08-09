import { FC, ReactNode } from "react";

import { ColorPrefrencesProvider } from "@/providers/colorPrefrences";
import { ThemeProvider } from "@/providers/themeProvider";
import MainContent from "@/components/mainContent";
import { WebSocketProvider } from "@/providers/webSocket";
import { QueryProvider } from "@/providers/queryProvider";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebSocketProvider>
        <ColorPrefrencesProvider>
          <MainContent>
            <QueryProvider>{children}</QueryProvider>
          </MainContent>
        </ColorPrefrencesProvider>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
