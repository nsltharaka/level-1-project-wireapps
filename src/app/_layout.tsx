import ShopContextProvider from "@/contexts/shopContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ShopContextProvider>
      <RootStack />
    </ShopContextProvider>
  );
}

function RootStack() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
