import CartIcon from "@/components/cart/CartIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import { Stack } from "expo-router";
import React from "react";

export default function StoreStack() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Store",
          headerShadowVisible: false,
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].baseBackground,
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? "light"].text,
          },
          headerRight: () => <CartIcon />,
        }}
      />
    </Stack>
  );
}
