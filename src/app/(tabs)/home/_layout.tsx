import Header from "@/components/layout/header";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <Header title="In Space Now" />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        options={{ headerShown: false, statusBarHidden: true }}
        name="astronaut/[id]"
      />
    </Stack>
  );
}
