import { ThemeProvider } from "@/hooks/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const client = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false, statusBarStyle: "auto" }} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
