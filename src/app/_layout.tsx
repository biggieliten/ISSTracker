import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

import AppTabs from "@/components/app-tabs";

const client = new QueryClient();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={client}>
        <AppTabs />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
