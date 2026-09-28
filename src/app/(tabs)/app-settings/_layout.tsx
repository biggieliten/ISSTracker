import Header from "@/components/layout/header";
import { Stack } from "expo-router";

export default function AppSettingsLayout() {
  return (
    <Stack screenOptions={{ header: () => <Header title="Settings" /> }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
