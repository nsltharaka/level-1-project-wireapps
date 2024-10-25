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
      <Stack.Screen name="index" options={{ title: "Shop" }} />
      <Stack.Screen
        name="product/[id]"
        options={{ title: "Product details" }}
      />
    </Stack>
  );
}
