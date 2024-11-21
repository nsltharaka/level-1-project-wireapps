import CartIcon from "@/components/cart/CartIcon";
import CartContextProvider from "@/contexts/cartContext/CartContext";
import FavoritesContextProvider from "@/contexts/favorites/FavoritesContext";
import GlobalContextProvider from "@/contexts/GlobalContext";
import ProductContextProvider from "@/contexts/productList/ProductContext";
import ProductListContextProvider from "@/contexts/productList/ProductListContext";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

// keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      // intentional delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // hide splash screen
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <GlobalContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <FavoritesContextProvider>
            <ProductListContextProvider>
              <RootStack />
            </ProductListContextProvider>
          </FavoritesContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </GlobalContextProvider>
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
