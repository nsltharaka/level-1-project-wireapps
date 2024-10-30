import CartContextProvider from "@/contexts/CartContext";
import ProductContextProvider from "@/contexts/ProductsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <RootStack />
      </CartContextProvider>
    </ProductContextProvider>
  );
}

function RootStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ title: "Shop" }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: true, title: "Product Details" }} />
    </Stack>
  )
}