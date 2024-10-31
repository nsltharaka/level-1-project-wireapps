import CartIcon from "@/components/cart/CartIcon";
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
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Shop" }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{ title: "Product Details", headerRight: () => <CartIcon /> }}
      />
      <Stack.Screen
        name="(modals)/cart"
        options={{ title: "Cart", presentation: "modal" }}
      />
    </Stack>
  );
}
