import CartIcon from "@/components/cart/CartIcon";
import CartContextProvider from "@/contexts/cartContext/CartContext";
import FavoritesContextProvider from "@/contexts/favorites/FavoritesContext";
import ProductContextProvider from "@/contexts/ProductContext";
import ProductListContextProvider from "@/contexts/productList/ProductListContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <FavoritesContextProvider>
          <ProductListContextProvider>
            <RootStack />
          </ProductListContextProvider>
        </FavoritesContextProvider>
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
      <Stack.Screen
        name="(modals)/filterBottomSheet"
        options={{
          headerSearchBarOptions: {},
          presentation: "transparentModal",
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="(modals)/sortBottomSheet"
        options={{
          headerSearchBarOptions: {},
          presentation: "transparentModal",
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  );
}
