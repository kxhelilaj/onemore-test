import QueryProvider from "@/providers/QueryProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </QueryProvider>
  );
}
