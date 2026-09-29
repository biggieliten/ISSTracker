import { Stack } from "expo-router";

export default function IssLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, statusBarHidden: true }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
