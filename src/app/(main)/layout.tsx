import { FC, ReactNode } from "react";

import { ColorPrefrencesProvider } from "@/providers/colorPrefrences";
import { ThemeProvider } from "@/providers/themeProvider";
import MainContent from "@/components/mainContent";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ColorPrefrencesProvider>
        <MainContent>
          {children}
        </MainContent>
      </ColorPrefrencesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
