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
    <Stack>
      <Stack.Screen name="index" options={{ title: "Shop" }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Product details",
        }}
      />
      <Stack.Screen
        name="(modals)/cart"
        options={{ title: "cart", presentation: "modal" }}
      />
    </Stack>
  );
}
