import CartIcon from "@/components/cart/CartIcon";
import { Colors } from "@/theme/Colors";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

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
            backgroundColor: Colors[colorScheme ?? "light"].background,
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
