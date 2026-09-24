import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppTabs from "@/components/app-tabs";

const client = new QueryClient();

export default function TabLayout() {
  return (
    <QueryClientProvider client={client}>
      <AppTabs />
    </QueryClientProvider>
  );
}
