import CartIcon from "@/components/cart/CartIcon";
import CartContextProvider from "@/contexts/cartContext/CartContext";
import FavoritesContextProvider from "@/contexts/favorites/FavoritesContext";
import { useGlobalContext } from "@/contexts/GlobalContext";
import ProductContextProvider from "@/contexts/productList/ProductContext";
import ProductListContextProvider from "@/contexts/productList/ProductListContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { onboarded } = useGlobalContext();

  if (!onboarded) {
    return <Redirect href="/onboarding/0" />;
  }

  return (
    <ProductContextProvider>
      <CartContextProvider>
        <FavoritesContextProvider>
          <ProductListContextProvider>
            <AppStack />
          </ProductListContextProvider>
        </FavoritesContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
  );
}

function AppStack() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "Shop",
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Product Details",
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].baseBackground,
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? "light"].text,
          },
          headerRight: () => <CartIcon />,
        }}
      />
      <Stack.Screen
        name="(modals)/cart"
        options={{
          title: "Cart",
          presentation: "modal",
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].baseBackground,
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? "light"].text,
          },
        }}
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
